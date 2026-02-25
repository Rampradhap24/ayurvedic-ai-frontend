import express from "express";
import {
  getInventory,
  getAllInventory,
  addItem,
  updateItem,
  deleteItem,
} from "../controllers/inventory.controller.js";

const router = express.Router();

/* ================= USER ROUTE ================= */
router.get("/", getInventory); // user store view (only active)

/* ================= ADMIN ROUTES ================= */
router.get("/admin/all", getAllInventory); // admin view all
router.post("/", addItem); // add medicine
router.put("/:id", updateItem); // edit medicine
router.delete("/:id", deleteItem); // delete medicine

export default router;