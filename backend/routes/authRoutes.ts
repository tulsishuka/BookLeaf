import { Router } from "express";


import { protect, requireRole } from "../middlewares/authMiddleware";
import { getAdminDashboard, getAuthorDashboard, getMe, login } from "../controllers/authController";
import { getAdminTicketById } from "../controllers/ticket.controller";


const router = Router();

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

router.post("/login", login);

router.get(
  "/me",
  protect,
  getMe
);

/*
|--------------------------------------------------------------------------
| Author
|--------------------------------------------------------------------------
*/

router.get(
  "/author/dashboard",
  protect,
  requireRole("author"),
  getAuthorDashboard
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.get(
  "/admin/dashboard",
  protect,
  requireRole("admin"),
  getAdminDashboard
);


router.get(
  "/admin/:id",
  protect,
  requireRole("admin"),
  getAdminTicketById
);

export default router;