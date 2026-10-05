import { GoogleGenAI } from "@google/genai";
import {
  TicketCategory,
  TicketPriority,
} from "../models/Ticket";


const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from .env");
}

const ai = new GoogleGenAI({
  apiKey,
});


const CATEGORIES: TicketCategory[] = [
  "Royalty & Payments",
  "ISBN & Metadata Issues",
  "Printing & Quality",
  "Distribution & Availability",
  "Book Status & Production Updates",
  "General Inquiry",
];

const PRIORITIES: TicketPriority[] = [
  "Critical",
  "High",
  "Medium",
  "Low",
];

export interface AIAnalysisResult {
  category: TicketCategory;
  priority: TicketPriority;
  draftResponse: string;
}

export const analyzeTicketWithAI = async ({
  subject,
  description,
  authorName,
  bookTitle,
}: {
  subject: string;
  description: string;
  authorName: string;
  bookTitle?: string;
}): Promise<AIAnalysisResult> => {
  const prompt = `
You are an AI support assistant for a publishing platform.

An author has submitted a support ticket.

Your job is to analyze the ticket and return:

1. The correct support category
2. The correct priority
3. A professional draft response for the admin to review

--------------------------------
ALLOWED CATEGORIES
--------------------------------

${CATEGORIES.join("\n")}

You MUST select exactly one of these categories.

--------------------------------
ALLOWED PRIORITIES
--------------------------------

${PRIORITIES.join("\n")}

You MUST select exactly one of these priorities.

--------------------------------
AUTHOR INFORMATION
--------------------------------

Author Name:
${authorName}

Book:
${bookTitle || "General / Account Level"}

--------------------------------
TICKET
--------------------------------

Subject:
${subject}

Description:
${description}

--------------------------------
RULES
--------------------------------

1. Choose exactly ONE category from the allowed categories.

2. Choose exactly ONE priority from the allowed priorities.

3. The priority should be based on the seriousness and urgency
   of the issue.

4. Write a concise, professional and helpful draft response.

5. The response is only a DRAFT for an admin.

6. The admin will review and edit the response before sending it.

7. Do NOT mention AI.

8. Do NOT invent company policies.

9. Do NOT invent payment dates.

10. Do NOT promise refunds, payments, publication dates,
    delivery dates or other outcomes unless the ticket provides
    enough information.

11. If information is missing, politely say that the support team
    will review the issue.

12. Do not make unsupported claims about the publishing company.

13. Keep the draft response between 2 and 5 sentences.

--------------------------------
RESPONSE FORMAT
--------------------------------

Return JSON only.

{
  "category": "one allowed category",
  "priority": "one allowed priority",
  "draftResponse": "professional draft response"
}
`;

  const MAX_ATTEMPTS = 3;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      console.log(
        ` Gemini ticket analysis attempt ${attempt}/${MAX_ATTEMPTS}`
      );

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",

          responseSchema: {
            type: "object",

            properties: {
              category: {
                type: "string",
                enum: CATEGORIES,
              },

              priority: {
                type: "string",
                enum: PRIORITIES,
              },

              draftResponse: {
                type: "string",
              },
            },

            required: [
              "category",
              "priority",
              "draftResponse",
            ],
          },
        },
      });

      if (!response.text) {
        throw new Error(
          "Gemini returned an empty response"
        );
      }

      const result = JSON.parse(response.text) as {
        category: string;
        priority: string;
        draftResponse: string;
      };

      if (
        !CATEGORIES.includes(
          result.category as TicketCategory
        )
      ) {
        throw new Error(
          `Invalid AI category returned: ${result.category}`
        );
      }

      if (
        !PRIORITIES.includes(
          result.priority as TicketPriority
        )
      ) {
        throw new Error(
          `Invalid AI priority returned: ${result.priority}`
        );
      }

      if (
        !result.draftResponse ||
        typeof result.draftResponse !== "string"
      ) {
        throw new Error(
          "Gemini did not return a valid draft response"
        );
      }

      console.log("✅ Gemini ticket analysis successful");

      return {
        category:
          result.category as TicketCategory,

        priority:
          result.priority as TicketPriority,

        draftResponse:
          result.draftResponse.trim(),
      };
    } catch (error) {
      console.error(
        `❌ Gemini attempt ${attempt} failed:`,
        error
      );

   
      const errorText =
        error instanceof Error
          ? error.message
          : String(error);

      const isTemporaryError =
        errorText.includes("503") ||
        errorText.includes("UNAVAILABLE") ||
        errorText.includes("high demand") ||
        errorText.includes("429") ||
        errorText.includes("RESOURCE_EXHAUSTED");

  
      if (!isTemporaryError) {
        throw error;
      }
      if (attempt === MAX_ATTEMPTS) {
        console.error(
          "❌ Gemini failed after all retry attempts"
        );

        throw new Error(
          "AI service is temporarily unavailable"
        );
      }

      const delay =
        attempt === 1
          ? 2000
          : 4000;

      console.log(
        `⏳ Retrying Gemini in ${delay}ms...`
      );

      await new Promise((resolve) =>
        setTimeout(resolve, delay)
      );
    }
  }

  throw new Error(
    "Failed to analyze ticket with AI"
  );
};
































// --------------------------------------------------
// Generate AI Draft From Ticket Conversation
// --------------------------------------------------

export interface ConversationMessage {
  senderRole: "author" | "admin";
  message: string;
  createdAt?: Date | string;
}

export const generateConversationDraft = async ({
  subject,
  authorName,
  bookTitle,
  messages,
}: {
  subject: string;
  authorName: string;
  bookTitle?: string;
  messages: ConversationMessage[];
}): Promise<string> => {
  try {
    const conversation = messages
      .map((msg) => {
        const sender =
          msg.senderRole === "author"
            ? "AUTHOR"
            : "ADMIN";

        return `${sender}: ${msg.message}`;
      })
      .join("\n\n");

    const prompt = `
You are an AI support assistant for a publishing platform.

Your job is to help the support admin prepare the NEXT response
to an author based on the complete conversation.

IMPORTANT:
The author may have replied after receiving an earlier admin response.

You MUST focus primarily on the author's MOST RECENT message,
while using the previous conversation for context.

--------------------------------
AUTHOR INFORMATION
--------------------------------

Author Name:
${authorName}

Book:
${bookTitle || "General / Account Level"}

--------------------------------
TICKET SUBJECT
--------------------------------

${subject}

--------------------------------
COMPLETE CONVERSATION
--------------------------------

${conversation}

--------------------------------
YOUR TASK
--------------------------------

Generate ONE professional draft response that the admin can
review and send to the author.

The draft MUST:

1. Directly address the author's latest message.

2. Use previous messages only as context.

3. NOT simply repeat the previous admin response.

4. If the author asks a new question, answer that question
   specifically when the available information allows it.

5. If the required information is unavailable, politely explain
   that the support team will review or verify the matter.

6. Do NOT invent company policies.

7. Do NOT invent payment dates.

8. Do NOT promise refunds, payments, publication dates,
   delivery dates, production dates, or other outcomes unless
   the conversation provides enough information.

9. Do NOT mention AI.

10. Do NOT pretend that you personally checked internal systems
    unless the conversation explicitly provides that information.

11. Keep the response concise and professional.

12. Write between 2 and 5 sentences.

13. The response is a DRAFT for the admin.
    The admin will review and edit it before sending.

--------------------------------
OUTPUT
--------------------------------

Return JSON only.

{
  "draftResponse": "professional response to the author's latest message"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: "object",

          properties: {
            draftResponse: {
              type: "string",
            },
          },

          required: ["draftResponse"],
        },
      },
    });

    if (!response.text) {
      throw new Error("Gemini returned an empty response");
    }

    const result = JSON.parse(response.text) as {
      draftResponse: string;
    };

    if (
      !result.draftResponse ||
      typeof result.draftResponse !== "string"
    ) {
      throw new Error(
        "Gemini did not return a valid conversation draft"
      );
    }

    return result.draftResponse.trim();
  } catch (error) {
    console.error(
      "AI CONVERSATION DRAFT ERROR:",
      error
    );

    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to generate conversation draft"
    );
  }
};

