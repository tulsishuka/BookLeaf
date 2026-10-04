import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  bookId: string;
  authorId: string;
  title: string;
  isbn: string;
  genre: string;
  publicationDate: Date | null;
  status: string;
  mrp: number | null;
  authorRoyaltyPerCopy: number | null;
  totalCopiesSold: number;
  totalRoyaltyEarned: number;
  royaltyPaid: number;
  royaltyPending: number;
  lastRoyaltyPayoutDate: Date | null;
  printPartner: string | null;
  availableOn: string[];
  coverImage: string | null;
}

const bookSchema = new Schema<IBook>(
  {
    bookId: {
      type: String,
      required: true,
      unique: true,
    },

    authorId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    isbn: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    publicationDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      required: true,
    },

    mrp: {
      type: Number,
      default: null,
    },

    authorRoyaltyPerCopy: {
      type: Number,
      default: null,
    },

    totalCopiesSold: {
      type: Number,
      default: 0,
    },

    totalRoyaltyEarned: {
      type: Number,
      default: 0,
    },

    royaltyPaid: {
      type: Number,
      default: 0,
    },

    royaltyPending: {
      type: Number,
      default: 0,
    },

    lastRoyaltyPayoutDate: {
      type: Date,
      default: null,
    },

    printPartner: {
      type: String,
      default: null,
    },

    availableOn: {
      type: [String],
      default: [],
    },

    coverImage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;