import express from "express";
import {
  getAllOrders,
  deleteOrder
} from "../controllers/adminOrders.controller.js";

const router = express.Router();

router.get("/", getAllOrders);
router.delete("/:id", deleteOrder);

export default router;