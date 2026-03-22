import express from "express";
import { protect } from "../middleware/auth.middleware.js";

import {
  saveConsultation,
  getMyConsultations,
  clearMyConsultations,
} from "../controllers/consultation.controller.js";

const router = express.Router();

router.post("/", protect, saveConsultation);
router.get("/my", protect, getMyConsultations);
router.delete("/clear", protect, clearMyConsultations);

export default router;