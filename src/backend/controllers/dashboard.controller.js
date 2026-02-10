import Consultation from "../models/Consultation.js";
import Order from "../models/Order.js";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import { calculateHealthScore } from "../utils/healthScore.js";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    /* ================= USER PROFILE ================= */
    const user = await User.findById(userId);

    /* ================= HEALTH SCORE ================= */
    const healthScore = calculateHealthScore({
      age: user.age,
      height: user.height,
      weight: user.weight,
      workType: user.workType,
    });

    /* ================= COUNTS ================= */
    const consultationsCount = await Consultation.countDocuments({
      user: userId,
    });

    const appointmentsCount = await Appointment.countDocuments({
      user: userId,
    });

    /* ================= MEDICINES USED ================= */
    const orders = await Order.find({ user: userId });

    let medicinesUsed = 0;
    orders.forEach(order => {
      order.items.forEach(item => {
        medicinesUsed += item.quantity;
      });
    });

    /* ================= RECENT ACTIVITY ================= */
    const recentActivity = [];

    const consultations = await Consultation.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    consultations.forEach(c => {
      recentActivity.push({
        type: "consultation",
        text: "AI consultation completed",
        date: c.createdAt,
      });
    });

    orders.slice(-5).forEach(order => {
      recentActivity.push({
        type: "order",
        text: `Purchased ${order.items.length} medicines`,
        date: order.createdAt,
      });
    });

    const appointments = await Appointment.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    appointments.forEach(a => {
      recentActivity.push({
        type: "appointment",
        text: `Doctor appointment on ${a.date} at ${a.time}`,
        date: a.createdAt,
      });
    });

    recentActivity.sort((a, b) => new Date(b.date) - new Date(a.date));

    /* ================= DASHBOARD ANALYSIS CHART ================= */
    const analysisChart = {
      labels: [
        "Health Score",
        "Consultations",
        "Doctors",
        "Medicines Used",
      ],
      values: [
        healthScore,
        consultationsCount,
        appointmentsCount,
        medicinesUsed,
      ],
    };

    /* ================= RESPONSE ================= */
    res.json({
      stats: {
        healthScore,
        consultations: consultationsCount,
        medicines: medicinesUsed,
        doctors: appointmentsCount,
      },
      analysisChart,
      recentActivity,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};