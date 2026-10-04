import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";
import Book from "../models/Book";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env");
}

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/
export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required",
      });
      return;
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role,
        authorId: user.authorId,
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        authorId: user.authorId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        role: user.role,
      },

      redirectTo:
        user.role === "admin"
          ? "/admin/dashboard"
          : "/author/dashboard",
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error during login",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET CURRENT USER
|--------------------------------------------------------------------------
*/
export const getMe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "Not authenticated",
      });
      return;
    }

    const user = await User.findById(
      req.user.userId
    ).select("-password");

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get me error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/*
|--------------------------------------------------------------------------
| AUTHOR DASHBOARD
|--------------------------------------------------------------------------
*/
export const getAuthorDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user?.authorId) {
      res.status(400).json({
        message: "Author ID not found",
      });
      return;
    }

    const author = await User.findOne({
      authorId: req.user.authorId,
      role: "author",
    }).select("-password");

    if (!author) {
      res.status(404).json({
        message: "Author not found",
      });
      return;
    }

    const books = await Book.find({
      authorId: req.user.authorId,
    }).sort({
      createdAt: -1,
    });

    const totalBooks = books.length;

    const totalCopiesSold = books.reduce(
      (total, book) =>
        total + (book.totalCopiesSold || 0),
      0
    );

    const totalRoyaltyEarned = books.reduce(
      (total, book) =>
        total + (book.totalRoyaltyEarned || 0),
      0
    );

    const royaltyPaid = books.reduce(
      (total, book) =>
        total + (book.royaltyPaid || 0),
      0
    );

    const royaltyPending = books.reduce(
      (total, book) =>
        total + (book.royaltyPending || 0),
      0
    );

    res.status(200).json({
      author,

      stats: {
        totalBooks,
        totalCopiesSold,
        totalRoyaltyEarned,
        royaltyPaid,
        royaltyPending,
      },

      books,
    });
  } catch (error) {
    console.error(
      "Author dashboard error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

/*
|--------------------------------------------------------------------------
| ADMIN DASHBOARD
|--------------------------------------------------------------------------
*/
export const getAdminDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authors = await User.find({
      role: "author",
    }).select("-password");

    const books = await Book.find().sort({
      createdAt: -1,
    });

    const totalAuthors = authors.length;

    const totalBooks = books.length;

    const totalCopiesSold = books.reduce(
      (total, book) =>
        total + (book.totalCopiesSold || 0),
      0
    );

    const totalRoyaltyEarned = books.reduce(
      (total, book) =>
        total + (book.totalRoyaltyEarned || 0),
      0
    );

    const totalRoyaltyPaid = books.reduce(
      (total, book) =>
        total + (book.royaltyPaid || 0),
      0
    );

    const totalRoyaltyPending = books.reduce(
      (total, book) =>
        total + (book.royaltyPending || 0),
      0
    );

    res.status(200).json({
      stats: {
        totalAuthors,
        totalBooks,
        totalCopiesSold,
        totalRoyaltyEarned,
        totalRoyaltyPaid,
        totalRoyaltyPending,
      },

      authors,
      books,
    });
  } catch (error) {
    console.error(
      "Admin dashboard error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};