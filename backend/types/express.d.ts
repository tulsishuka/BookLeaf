import { Request } from "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      userId: string;
      role: "author" | "admin";
      authorId?: string;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};