import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  ticketId: mongoose.Types.ObjectId;

  senderId: mongoose.Types.ObjectId;

  senderRole: "author" | "admin";

  message: string;

  isInternal: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    ticketId: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },

    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    senderRole: {
      type: String,
      enum: ["author", "admin"],
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    isInternal: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model<IMessage>(
  "Message",
  messageSchema
);

export default Message;