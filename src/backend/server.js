import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

/* ================= FIX __dirname (ES MODULE) ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= LOAD ROOT .env ================= */
/*
Your .env is located at:
ayurvedic-ai-frontend/.env

server.js is located at:
ayurvedic-ai-frontend/src/backend/

So we go 2 levels up.
*/
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

/* ================= IMPORTS ================= */
import connectDB from "./config/db.js";
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

/* ================= CREATE APP ================= */
const app = express();

/* ================= DEBUG ENV ================= */
if (!process.env.OPENAI_API_KEY) {
  console.warn("❌ OPENAI_API_KEY is missing");
} else {
  console.log("OPENAI KEY LOADED:", process.env.OPENAI_API_KEY ? "YES" : "NO");
}

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

/* ================= HEALTH CHECK ================= */
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

/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    /* 🔥 AUTO-SYNC INVENTORY */
    await seedInventory();
    console.log("✅ Inventory synced");

    app.listen(PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();