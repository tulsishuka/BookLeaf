import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  authorId?: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  joinedDate?: Date;
  password: string;
  role: "author" | "admin";
}

const userSchema = new Schema<IUser>(
  {
    authorId: {
      type: String,
      unique: true,
      sparse: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
    },

    city: {
      type: String,
    },

    joinedDate: {
      type: Date,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["author", "admin"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;