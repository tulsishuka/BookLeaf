import { Router } from "express";

import {
  login,
  getMe,
  getAuthorDashboard,
  getAdminDashboard,
} from "../controllers/authController";
import { protect, requireRole } from "../middlewares/authMiddleware";


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

export default router;