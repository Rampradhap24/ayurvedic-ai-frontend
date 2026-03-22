
/* ================= GET ALL ORDERS ================= */
import Order from "../models/Order.js";

/* ================= GET ALL ORDERS (ADMIN) ================= */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/* ================= UPDATE ORDER STATUS ================= */
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order updated",
      data: updated,
    });

  } catch (err) {
    console.error("🔥 UPDATE ERROR:", err);
    res.status(500).json({
      message: "Failed to update order",
    });
  }
};

/* ================= DELETE ORDER ================= */
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndDelete(id);

    res.json({ message: "Order deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};