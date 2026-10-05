import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import ticketRoutes from "./routes/ticket.routes";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://book-leaf-nu.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({
    message: "BookLeaf API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

export default app;