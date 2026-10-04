import { GoogleGenAI } from "@google/genai";
import {
  TicketCategory,
  TicketPriority,
} from "../models/Ticket";

// --------------------------------------------------
// Gemini API
// --------------------------------------------------

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from .env");
}

const ai = new GoogleGenAI({
  apiKey,
});

// --------------------------------------------------
// Allowed Ticket Categories
// --------------------------------------------------

const CATEGORIES: TicketCategory[] = [
  "Royalty & Payments",
  "ISBN & Metadata Issues",
  "Printing & Quality",
  "Distribution & Availability",
  "Book Status & Production Updates",
  "General Inquiry",
];

// --------------------------------------------------
// Allowed Ticket Priorities
// --------------------------------------------------

const PRIORITIES: TicketPriority[] = [
  "Critical",
  "High",
  "Medium",
  "Low",
];

// --------------------------------------------------
// AI Result Type
// --------------------------------------------------

export interface AIAnalysisResult {
  category: TicketCategory;
  priority: TicketPriority;
  draftResponse: string;
}

// --------------------------------------------------
// Analyze Support Ticket
// --------------------------------------------------

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
  try {
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

3. The priority should be based on the seriousness and urgency of the issue.

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

The JSON must have exactly these fields:

{
  "category": "one allowed category",
  "priority": "one allowed priority",
  "draftResponse": "professional draft response"
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

    // --------------------------------------------------
    // Check Gemini response
    // --------------------------------------------------

    if (!response.text) {
      throw new Error("Gemini returned an empty response");
    }

    // --------------------------------------------------
    // Parse JSON
    // --------------------------------------------------

    const result = JSON.parse(response.text) as {
      category: string;
      priority: string;
      draftResponse: string;
    };

    // --------------------------------------------------
    // Validate AI Category
    // --------------------------------------------------

    if (!CATEGORIES.includes(result.category as TicketCategory)) {
      throw new Error(
        `Invalid AI category returned: ${result.category}`
      );
    }

    // --------------------------------------------------
    // Validate AI Priority
    // --------------------------------------------------

    if (!PRIORITIES.includes(result.priority as TicketPriority)) {
      throw new Error(
        `Invalid AI priority returned: ${result.priority}`
      );
    }

    // --------------------------------------------------
    // Validate Draft Response
    // --------------------------------------------------

    if (
      !result.draftResponse ||
      typeof result.draftResponse !== "string"
    ) {
      throw new Error(
        "Gemini did not return a valid draft response"
      );
    }

    // --------------------------------------------------
    // Return properly typed result
    // --------------------------------------------------

    return {
      category: result.category as TicketCategory,
      priority: result.priority as TicketPriority,
      draftResponse: result.draftResponse.trim(),
    };
  } catch (error) {
    console.error("AI TICKET ANALYSIS ERROR:", error);

    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to analyze ticket with AI"
    );
  }
};