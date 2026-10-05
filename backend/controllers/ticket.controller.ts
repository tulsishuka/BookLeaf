import { Request, Response } from "express";
import mongoose from "mongoose";

import Ticket from "../models/Ticket";
import Message from "../models/Message";
import Book from "../models/Book";
import { analyzeTicketWithAI, generateConversationDraft } from "../services/ai.service";
import User from "../models/User";


const getAuthorId = (req: Request): string | null => {
  if (!req.user?.authorId) {
    return null;
  }

  return req.user.authorId;
};

const getUserId = (req: Request): string | null => {
  if (!req.user?.userId) {
    return null;
  }

  return req.user.userId;
};

export const createTicket = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const authorId = getAuthorId(req);
    const userId = getUserId(req);

    if (!authorId || !userId) {
      return res.status(401).json({
        message: "Author authentication information is missing",
      });
    }

    const {
      bookId,
      subject,
      description,
    } = req.body as {
      bookId?: string;
      subject?: string;
      description?: string;
    };

    if (!subject?.trim()) {
      return res.status(400).json({
        message: "Subject is required",
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        message: "Description is required",
      });
    }

    const author = await User.findById(userId).select(
      "name email authorId role"
    );

    if (!author) {
      return res.status(404).json({
        message: "Author account not found",
      });
    }

    let validBookId: mongoose.Types.ObjectId | null = null;

    let selectedBook = null;

    if (bookId) {
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({
          message: "Invalid book ID",
        });
      }

      selectedBook = await Book.findOne({
        _id: bookId,
        authorId: authorId,
      });

      if (!selectedBook) {
        return res.status(403).json({
          message:
            "This book does not belong to your account",
        });
      }

      validBookId = selectedBook._id;
    }

    let category:
      | "Royalty & Payments"
      | "ISBN & Metadata Issues"
      | "Printing & Quality"
      | "Distribution & Availability"
      | "Book Status & Production Updates"
      | "General Inquiry" = "General Inquiry";

    let priority:
      | "Critical"
      | "High"
      | "Medium"
      | "Low" = "Medium";

    let aiDraftResponse =
      "Thank you for contacting our support team. " +
      "We have received your request and will review " +
      "the issue shortly.";

  

    try {
      console.log("🤖 Starting AI ticket analysis...");

      const aiResult = await analyzeTicketWithAI({
        subject: subject.trim(),
        description: description.trim(),
        authorName: author.name,
        bookTitle: selectedBook?.title,
      });

      // AI succeeded
      category = aiResult.category;
      priority = aiResult.priority;
      aiDraftResponse = aiResult.draftResponse;

      console.log(
        "✅ AI ticket analysis completed successfully"
      );
    } catch (aiError) {
  
      console.error(
        "⚠️ AI analysis failed.",
        aiError
      );

      console.log(
        "⚠️ Creating ticket using fallback values..."
      );

    }


    const ticket = await Ticket.create({
      authorId: authorId,

      bookId: validBookId,

      subject: subject.trim(),

      description: description.trim(),
      category,

      priority,
      aiCategory: category,

      aiPriority: priority,

      aiDraftResponse,

      status: "Open",
    });

   
    const firstMessage = await Message.create({
      ticketId: ticket._id,

      senderId: new mongoose.Types.ObjectId(userId),

      senderRole: "author",

      message: description.trim(),

      isInternal: false,
    });

 
    return res.status(201).json({
      message: "Support ticket created successfully",

      ticket,

      firstMessage,
    });
  } catch (error) {
  
    console.error(
      "CREATE TICKET ERROR:",
      error
    );

    return res.status(500).json({
      message: "Failed to create support ticket",

      error:
        error instanceof Error
          ? error.message
          : "Unknown server error",
    });
  }
};





export const getMyTickets = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const authorId = getAuthorId(req);

    if (!authorId) {
      return res.status(401).json({
        message: "Author authentication information is missing",
      });
    }

    const tickets = await Ticket.find({
      authorId: authorId,
    })
      .populate("bookId", "title isbn")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      tickets,
    });
  } catch (error) {
    console.error("Get my tickets error:", error);

    return res.status(500).json({
      message: "Failed to fetch your tickets",
    });
  }
};


export const getTicketById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const authorId = getAuthorId(req);

    if (!authorId) {
      return res.status(401).json({
        message: "Author authentication information is missing",
      });
    }

    const ticketId = String(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return res.status(400).json({
        message: "Invalid ticket ID",
      });
    }
    const ticket = await Ticket.findOne({
      _id: ticketId,
      authorId: authorId,
    }).populate("bookId", "title isbn");

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }
    const messages = await Message.find({
      ticketId: ticketId,
      isInternal: false,
    }).sort({
      createdAt: 1,
    });

    return res.status(200).json({
      ticket,
      messages,
    });
  } catch (error) {
    console.error("Get ticket error:", error);

    return res.status(500).json({
      message: "Failed to fetch ticket",
    });
  }
};




export const getAllTickets = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      status,
      category,
      priority,
    } = req.query;

    const filter: Record<string, string> = {};

    if (typeof status === "string") {
      filter.status = status;
    }

    if (typeof category === "string") {
      filter.category = category;
    }

    if (typeof priority === "string") {
      filter.priority = priority;
    }

    const tickets = await Ticket.find(filter)
      .populate("authorId", "name email")
      .populate("bookId", "title isbn")
      .sort({
        createdAt: 1,
      });

    return res.status(200).json({
      tickets,
    });
  } catch (error) {
    console.error("Get all tickets error:", error);

    return res.status(500).json({
      message: "Failed to fetch tickets",
    });
  }
};


export const updateTicket = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const ticketId = String(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return res.status(400).json({
        message: "Invalid ticket ID",
      });
    }

    const {
      status,
      category,
      priority,
      assignedTo,
    } = req.body as {
      status?: string;
      category?: string;
      priority?: string;
      assignedTo?: string | null;
    };

    const updateData: Record<string, unknown> = {};

    if (status) {
      updateData.status = status;
    }

    if (category) {
      updateData.category = category;
    }

    if (priority) {
      updateData.priority = priority;
    }

    if (assignedTo !== undefined) {
      updateData.assignedTo = assignedTo || null;
    }

    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    return res.status(200).json({
      message: "Ticket updated successfully",
      ticket,
    });
  } catch (error) {
    console.error("Update ticket error:", error);

    return res.status(500).json({
      message: "Failed to update ticket",
    });
  }
};


export const sendAdminResponse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const adminId = getUserId(req);

    if (!adminId) {
      return res.status(401).json({
        message: "Admin authentication information is missing",
      });
    }

    const ticketId = String(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return res.status(400).json({
        message: "Invalid ticket ID",
      });
    }

    const {
      message,
    } = req.body as {
      message?: string;
    };

    if (!message?.trim()) {
      return res.status(400).json({
        message: "Response message is required",
      });
    }

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    const newMessage = await Message.create({
      ticketId: ticket._id,
      senderId: adminId,
      senderRole: "admin",
      message: message.trim(),
      isInternal: false,
    });

    ticket.status = "In Progress";

    await ticket.save();

    return res.status(201).json({
      message: "Response sent successfully",
      data: newMessage,
      ticket,
    });
  } catch (error) {
    console.error("Send admin response error:", error);

    return res.status(500).json({
      message: "Failed to send response",
    });
  }
};

export const addInternalNote = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const adminId = getUserId(req);

    if (!adminId) {
      return res.status(401).json({
        message: "Admin authentication information is missing",
      });
    }

    const ticketId = String(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return res.status(400).json({
        message: "Invalid ticket ID",
      });
    }

    const {
      message,
    } = req.body as {
      message?: string;
    };

    if (!message?.trim()) {
      return res.status(400).json({
        message: "Internal note is required",
      });
    }

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    const note = await Message.create({
      ticketId: ticket._id,
      senderId: adminId,
      senderRole: "admin",
      message: message.trim(),
      isInternal: true,
    });

    return res.status(201).json({
      message: "Internal note added successfully",
      data: note,
    });
  } catch (error) {
    console.error("Internal note error:", error);

    return res.status(500).json({
      message: "Failed to add internal note",
    });
  }
};





export const getAdminTicketById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    if (!id || id === "undefined") {
      return res.status(400).json({
        message: "Ticket ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ticket ID",
      });
    }

    const ticket = await Ticket.findById(id)
      .populate("bookId", "title isbn genre publicationDate status")
      .populate("assignedTo", "name email");

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    const messages = await Message.find({
      ticketId: ticket._id,
    })
      .sort({ createdAt: 1 })
      .lean();

    return res.status(200).json({
      ticket,
      messages,
    });
  } catch (error) {
    console.error("GET ADMIN TICKET ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch ticket",
      error: error instanceof Error
        ? error.message
        : "Unknown error",
    });
  }
};

export const sendAuthorReply = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const authorId = getAuthorId(req);
    const userId = getUserId(req);

    if (!authorId || !userId) {
      return res.status(401).json({
        message: "Author authentication information is missing",
      });
    }

    const ticketId = String(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return res.status(400).json({
        message: "Invalid ticket ID",
      });
    }

    const { message } = req.body as {
      message?: string;
    };

    if (!message?.trim()) {
      return res.status(400).json({
        message: "Reply message is required",
      });
    }

    const ticket = await Ticket.findOne({
      _id: ticketId,
      authorId,
    }).populate("bookId", "title isbn");

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    if (ticket.status === "Closed") {
      return res.status(400).json({
        message:
          "This ticket is closed and cannot receive new replies",
      });
    }
    const newMessage = await Message.create({
      ticketId: ticket._id,
      senderId: new mongoose.Types.ObjectId(userId),
      senderRole: "author",
      message: message.trim(),
      isInternal: false,
    });

    const conversation = await Message.find({
      ticketId: ticket._id,
      isInternal: false,
    })
      .sort({ createdAt: 1 })
      .lean();

    const author = await User.findOne({
      authorId,
    }).select("name");

    const authorName = author?.name || "Author";

    const bookTitle =
      ticket.bookId &&
      typeof ticket.bookId === "object" &&
      "title" in ticket.bookId
        ? String(
            (ticket.bookId as unknown as { title?: string })
              .title || ""
          )
        : undefined;


    let newAIDraft = "";

    try {
      newAIDraft = await generateConversationDraft({
        subject: ticket.subject,
        authorName,
        bookTitle,
        messages: conversation.map((msg) => ({
          senderRole: msg.senderRole,
          message: msg.message,
          createdAt: msg.createdAt,
        })),
      });

      ticket.aiDraftResponse = newAIDraft;

      await ticket.save();
    } catch (aiError) {
      console.error(
        "AI DRAFT GENERATION FAILED:",
        aiError
      );

    }

    return res.status(201).json({
      message: "Reply sent successfully",
      data: newMessage,
      ticket,
      aiDraftResponse: ticket.aiDraftResponse,
    });
  } catch (error) {
    console.error(
      "SEND AUTHOR REPLY ERROR:",
      error
    );

    return res.status(500).json({
      message: "Failed to send reply",
      error:
        error instanceof Error
          ? error.message
          : "Unknown server error",
    });
  }
};

