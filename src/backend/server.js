import express from "express";
import dotenv from "dotenv";
import cors from "cors";

/* DB */
import connectDB from "./config/db.js";

/* SEEDER */
import seedInventory from "./seed/inventory.seed.js";

/* ROUTES */
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import consultationRoutes from "./routes/consultation.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import orderRoutes from "./routes/order.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

app.use(express.json());

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.json({ message: "🌿 Ayurvedic AI Backend Running" });
});

/* ================= API ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/consultation", consultationRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5001;

connectDB()
  .then(() => {
    console.log("✅ MongoDB connected");

    /* 🔥 AUTO-SYNC INVENTORY */
    seedInventory();

    app.listen(PORT, () => {
      console.log(`🚀 Backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  });