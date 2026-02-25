import Order from "../models/Order.js";
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";

/* ================= USERS CSV ================= */
export const exportUsersCSV = async (req, res) => {
  try {
    const users = await User.find();

    let csv = "UserID,Name,Email,Age,Gender,CreatedDate\n";

    users.forEach((user) => {
      csv += `${user._id},`;
      csv += `${user.name},`;
      csv += `${user.email},`;
      csv += `${user.age || ""},`;
      csv += `${user.gender || ""},`;
      csv += `${new Date(user.createdAt).toLocaleDateString()}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=users_report.csv"
    );

    res.status(200).send(csv);

  } catch (err) {
    res.status(500).json({ message: "Users CSV export failed" });
  }
};

/* ================= ORDERS CSV ================= */
export const exportOrdersCSV = async (req, res) => {
  try {
    const orders = await Order.find().populate("user");

    let csv = "OrderID,User,Email,Amount,Status,Date\n";

    orders.forEach((order) => {
      csv += `${order._id},`;
      csv += `${order.user?.name || ""},`;
      csv += `${order.user?.email || ""},`;
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
    res.status(500).json({ message: "Orders CSV export failed" });
  }
};

/* ================= APPOINTMENTS CSV ================= */
export const exportAppointmentsCSV = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("user");

    let csv = "AppointmentID,User,Doctor,Date,Status\n";

    appointments.forEach((appt) => {
      csv += `${appt._id},`;
      csv += `${appt.user?.name || ""},`;
      csv += `${appt.doctorName},`;
      csv += `${new Date(appt.date).toLocaleDateString()},`;
      csv += `${appt.status}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=appointments_report.csv"
    );

    res.status(200).send(csv);

  } catch (err) {
    res.status(500).json({ message: "Appointments CSV export failed" });
  }
};