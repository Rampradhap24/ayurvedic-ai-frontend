import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createAppointment,
  getMyAppointments,
} from "../controllers/appointment.controller.js";

const router = express.Router();

router.post("/", protect, createAppointment);
router.get("/my", protect, getMyAppointments);

export default router;