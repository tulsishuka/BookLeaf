import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is missing in .env");
}

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      " Failed to start server:",
      error
    );

    process.exit(1);
  }
};

startServer();