import express from "express";
import {
  getAllAppointments,
  updateAppointmentStatus,
} from "../controllers/adminAppointments.controller.js";

const router = express.Router();

/* ================= ROUTES ================= */
router.get("/", getAllAppointments);
router.put("/:id", updateAppointmentStatus);

export default router;