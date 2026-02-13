import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  saveConsultation,
  getMyConsultations,
} from "../controllers/consultation.controller.js";

const router = express.Router();

router.post("/", protect, saveConsultation);
router.get("/my", protect, getMyConsultations);

export default router;