import Consultation from "../models/Consultation.js";
import { getAIResponse } from "../services/ai.service.js";

/* ================= SAVE CONSULTATION ================= */
export const saveConsultation = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message required" });
    }

    const aiReply = await getAIResponse(message);

    const consultation = await Consultation.create({
      user: req.user._id,
      messages: [
        { role: "user", content: message },
        { role: "assistant", content: aiReply || "No response generated" },
      ],
    });

    res.json({
      reply: aiReply,
      consultationId: consultation._id,
    });

  } catch (err) {
    console.error("Consultation error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET MY CONSULTATIONS ================= */
export const getMyConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(consultations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};