

import mongoose, { Document, Schema } from "mongoose";

export type TicketStatus =
  | "Open"
  | "In Progress"
  | "Resolved"
  | "Closed";

export type TicketCategory =
  | "Royalty & Payments"
  | "ISBN & Metadata Issues"
  | "Printing & Quality"
  | "Distribution & Availability"
  | "Book Status & Production Updates"
  | "General Inquiry";

export type TicketPriority =
  | "Critical"
  | "High"
  | "Medium"
  | "Low";

export interface ITicket extends Document {
    authorId: string;

  bookId?: mongoose.Types.ObjectId | null;

  subject: string;
  description: string;

  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;

  assignedTo?: mongoose.Types.ObjectId | null;

  aiCategory?: string | null;
  aiPriority?: string | null;
  aiDraftResponse?: string | null;

  createdAt: Date;
  updatedAt: Date;
}

const ticketSchema = new Schema<ITicket>(
  {
    authorId: {
      type: String,
      required: true,
      index: true,
    },

    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      default: null,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Royalty & Payments",
        "ISBN & Metadata Issues",
        "Printing & Quality",
        "Distribution & Availability",
        "Book Status & Production Updates",
        "General Inquiry",
      ],
      default: "General Inquiry",
    },

    priority: {
      type: String,
      enum: ["Critical", "High", "Medium", "Low"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    aiCategory: {
      type: String,
      default: null,
    },

    aiPriority: {
      type: String,
      default: null,
    },

    aiDraftResponse: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model<ITicket>("Ticket", ticketSchema);

export default Ticket;

