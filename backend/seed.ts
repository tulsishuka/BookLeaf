import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "./models/User";
import Book from "./models/Book";
import { authors } from "./data/seedData";

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is missing in .env");
    }

    await mongoose.connect(mongoUri);

    console.log("✅ MongoDB connected");

    // Remove existing demo data
    await User.deleteMany({});
    await Book.deleteMany({});

    console.log("🗑️ Old users and books removed");

    // Password for all demo authors
    const hashedAuthorPassword = await bcrypt.hash(
      "password123",
      10
    );

    // Create authors and books
    for (const author of authors) {
      await User.create({
        authorId: author.author_id,
        name: author.name,
        email: author.email,
        phone: author.phone,
        city: author.city,
        joinedDate: new Date(author.joined_date),
        password: hashedAuthorPassword,
        role: "author",
      });

      const books = author.books.map((book) => ({
        bookId: book.book_id,
        authorId: author.author_id,
        title: book.title,
        isbn: book.isbn,
        genre: book.genre,

        publicationDate: book.publication_date
          ? new Date(book.publication_date)
          : null,

        status: book.status,
        mrp: book.mrp,
        authorRoyaltyPerCopy: book.author_royalty_per_copy,
        totalCopiesSold: book.total_copies_sold,
        totalRoyaltyEarned: book.total_royalty_earned,
        royaltyPaid: book.royalty_paid,
        royaltyPending: book.royalty_pending,

        lastRoyaltyPayoutDate:
          book.last_royalty_payout_date
            ? new Date(book.last_royalty_payout_date)
            : null,

        printPartner: book.print_partner,
        availableOn: book.available_on,

        coverImage: null,
      }));

      if (books.length > 0) {
        await Book.insertMany(books);
      }

      console.log(
        `📚 Created ${author.name} → ${books.length} books`
      );
    }

    // Create admin account
    const hashedAdminPassword = await bcrypt.hash(
      "admin123",
      10
    );

    await User.create({
      name: "BookLeaf Admin",
      email: "admin@bookleaf.com",
      password: hashedAdminPassword,
      role: "admin",
    });

    console.log("👤 Admin created");

    // Count documents
    const userCount = await User.countDocuments();
    const bookCount = await Book.countDocuments();

    console.log("");
    console.log("================================");
    console.log("🎉 DATABASE SEEDED SUCCESSFULLY");
    console.log("================================");
    console.log(`Users: ${userCount}`);
    console.log(`Books: ${bookCount}`);
    console.log("================================");
    console.log("");

    console.log("Author login:");
    console.log("Email: priya.sharma@email.com");
    console.log("Password: password123");

    console.log("");

    console.log("Admin login:");
    console.log("Email: admin@bookleaf.com");
    console.log("Password: admin123");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    process.exit(1);
  }
};

seedDatabase();