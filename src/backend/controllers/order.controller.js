import Order from "../models/Order.js";

/* CREATE ORDER */
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const formattedItems = items.map(item => ({
      product: item.product?._id || item.product || item._id, // ✅ FIX
      quantity: item.quantity || item.qty,
    }));

    const order = await Order.create({
      user: req.user._id,
      items: formattedItems,
      totalAmount,
      paymentStatus: "paid",
    });

    res.status(201).json(order);

  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
/* GET MY ORDERS */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate({
        path: "items.product",
        select: "name price image",
      })
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};