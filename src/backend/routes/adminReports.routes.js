import express from "express";
import { protectAdmin } from "../middleware/admin.middleware.js";
import {
  downloadUsersReport,
  downloadOrdersReport,
  downloadAppointmentsReport,
} from "../controllers/adminReports.controller.js";

const router = express.Router();

/* ================= REPORT DOWNLOAD ROUTES ================= */

// 🔐 Protected routes
router.get("/download/users", protectAdmin, downloadUsersReport);
router.get("/download/orders", protectAdmin, downloadOrdersReport);
router.get("/download/appointments", protectAdmin, downloadAppointmentsReport);

export default router;