import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/dashboard", protect, admin, (req, res) => {
  res.json({ message: "Admin dashboard access granted" });
});

export default router;