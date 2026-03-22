import express from "express";
import {
  createAppointment,
  getUserAppointments,
} from "../controllers/appointment.controller.js";

const router = express.Router();

// ❌ NO protectUser here
router.post("/", createAppointment);
router.get("/user", getUserAppointments);

export default router;