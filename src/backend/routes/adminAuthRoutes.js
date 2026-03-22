import express from "express";
import { adminLogin } from "../controllers/adminAuth.controller.js";

import {
  exportUsersCSV,
  exportOrdersCSV,
  exportAppointmentsCSV,
} from "../controllers/adminReport.controller.js";

import {
  getAllInventory,
  addMedicine,
  updateMedicine,
  deleteMedicine,
} from "../controllers/adminInventory.controller.js";

const router = express.Router();

/* ================= ADMIN LOGIN ================= */
router.post("/login", adminLogin);

/* ================= REPORT ROUTES ================= */
router.get("/reports/download/users", exportUsersCSV);
router.get("/reports/download/orders", exportOrdersCSV);
router.get("/reports/download/appointments", exportAppointmentsCSV);

/* ================= INVENTORY MANAGEMENT ================= */

/* Get All Inventory */
router.get("/inventory", getAllInventory);

/* Add Medicine */
router.post("/inventory", addMedicine);

/* Update Medicine */
router.put("/inventory/:id", updateMedicine);

/* Delete Medicine */
router.delete("/inventory/:id", deleteMedicine);

export default router;