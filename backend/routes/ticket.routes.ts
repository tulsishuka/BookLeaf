
import express from "express";

import {
  createTicket,
  getMyTickets,
  getTicketById,
  getAllTickets,
  getAdminTicketById,
  sendAdminResponse,
  addInternalNote,
  updateTicket,
} from "../controllers/ticket.controller";

import {
  protect,
  requireRole,
} from "../middlewares/authMiddleware";

const router = express.Router();

// ===============================
// ADMIN ROUTES
// ===============================

router.get(
  "/admin/all",
  protect,
  requireRole("admin"),
  getAllTickets
);


router.get(
  "/admin/:id",
  protect,
  requireRole("admin"),
  getAdminTicketById
);

// ===============================
// AUTHOR ROUTES
// ===============================

router.get(
  "/my",
  protect,
  requireRole("author"),
  getMyTickets
);

router.post(
  "/",
  protect,
  requireRole("author"),
  createTicket
);

router.get(
  "/:id",
  protect,
  requireRole("author"),
  getTicketById
);

// ===============================
// ADMIN ACTIONS
// ===============================

router.patch(
  "/:id",
  protect,
  requireRole("admin"),
  updateTicket
);

router.post(
  "/:id/respond",
  protect,
  requireRole("admin"),
  sendAdminResponse
);

router.post(
  "/:id/internal-note",
  protect,
  requireRole("admin"),
  addInternalNote
);

export default router;