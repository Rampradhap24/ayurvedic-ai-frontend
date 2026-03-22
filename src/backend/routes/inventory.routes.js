import express from "express";
import multer from "multer";
import {
  getInventory,
  getAllInventory,
  addItem,
  updateItem,
  deleteItem,
} from "../controllers/inventory.controller.js";

const router = express.Router();

/* ================= MULTER CONFIG ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/backend/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ================= USER ================= */
router.get("/", getInventory);

/* ================= ADMIN ================= */
router.get("/admin/all", getAllInventory);

/* ✅ ADD MEDICINE WITH IMAGE UPLOAD */
router.post("/admin", upload.single("image"), addItem);

/* UPDATE (NO IMAGE CHANGE) */
router.put("/admin/:id", updateItem);

/* DELETE */
router.delete("/admin/:id", deleteItem);

export default router;