import Order from "../models/Order.js";

/* ================= EXPORT ORDERS CSV ================= */
export const exportOrdersCSV = async (req, res) => {
  try {
    const orders = await Order.find().populate("user");

    let csv =
      "OrderID,User,Email,TotalAmount,Status,Date\n";

    orders.forEach((order) => {
      csv += `${order._id},`;
      csv += `${order.user?.name || "N/A"},`;
      csv += `${order.user?.email || "N/A"},`;
      csv += `${order.totalAmount},`;
      csv += `${order.status},`;
      csv += `${new Date(order.createdAt).toLocaleDateString()}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=orders_report.csv"
    );

    res.status(200).send(csv);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "CSV export failed" });
  }
};