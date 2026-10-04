import { Request, Response } from "express";
import mongoose from "mongoose";

import Ticket from "../models/Ticket";
import Message from "../models/Message";
import Book from "../models/Book";

// ============================================================
// HELPERS
// ============================================================

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

    // -----------------------------------------
    // AUTH CHECK
    // -----------------------------------------

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

    // -----------------------------------------
    // VALIDATE SUBJECT
    // -----------------------------------------

    if (!subject?.trim()) {
      return res.status(400).json({
        message: "Subject is required",
      });
    }

    // -----------------------------------------
    // VALIDATE DESCRIPTION
    // -----------------------------------------

    if (!description?.trim()) {
      return res.status(400).json({
        message: "Description is required",
      });
    }

    // -----------------------------------------
    // BOOK IS OPTIONAL
    //
    // Author can:
    // 1. Select a book
    // 2. Send a General / Account Level query
    // -----------------------------------------

    let validBookId: mongoose.Types.ObjectId | null = null;

    if (bookId) {
      // Check ObjectId
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({
          message: "Invalid book ID",
        });
      }

      // Make sure this book belongs to the logged-in author
      const book = await Book.findOne({
        _id: bookId,
        authorId: authorId,
      });

      if (!book) {
        return res.status(403).json({
          message: "This book does not belong to your account",
        });
      }

      validBookId = new mongoose.Types.ObjectId(bookId);
    }

    // -----------------------------------------
    // CREATE TICKET
    // -----------------------------------------

    const ticket = await Ticket.create({
      authorId: authorId,

      // null when General / Account Level
      bookId: validBookId,

      subject: subject.trim(),
      description: description.trim(),

      // AI can update these later
      category: "General Inquiry",
      priority: "Medium",
      status: "Open",
    });

    // -----------------------------------------
    // CREATE FIRST MESSAGE
    // -----------------------------------------
    //
    // IMPORTANT:
    // senderId = USER _id
    // NOT authorId ("AUTH001")
    //

    const firstMessage = await Message.create({
      ticketId: ticket._id,

      // MongoDB User _id
      senderId: new mongoose.Types.ObjectId(userId),

      senderRole: "author",
      message: description.trim(),
      isInternal: false,
    });

    // -----------------------------------------
    // RESPONSE
    // -----------------------------------------

    return res.status(201).json({
      message: "Support ticket created successfully",

      ticket,

      firstMessage,
    });
  } catch (error) {
    console.error("CREATE TICKET ERROR:", error);

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

    // Only allow the author to access their own ticket
    const ticket = await Ticket.findOne({
      _id: ticketId,
      authorId: authorId,
    }).populate("bookId", "title isbn");

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    // Only public messages
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

// ============================================================
// ADMIN
// UPDATE TICKET
// ============================================================

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

// ============================================================
// ADMIN
// SEND RESPONSE
// ============================================================

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

// ============================================================
// ADMIN
// ADD INTERNAL NOTE
// ============================================================

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