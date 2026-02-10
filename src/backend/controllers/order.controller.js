import Order from "../models/Order.js";

/* CREATE ORDER */
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const order = await Order.create({
      user: req.user._id,   // ✅ VERY IMPORTANT
      items,
      totalAmount,
      paymentStatus: "paid",
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET MY ORDERS */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,   // ✅ ONLY THIS USER
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};