import Consultation from "../models/Consultation.js";
import { getAIResponse } from "../services/ai.service.js";
import { findParameterMatch } from "../services/parameter.service.js";

/* ================= SAVE CONSULTATION ================= */
export const saveConsultation = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message required" });
    }

    /* 1️⃣ AI explanation only */
    const aiReplyRaw = await getAIResponse(message);

    if (!aiReplyRaw) {
      return res.status(500).json({
        message: "AI did not generate a response",
      });
    }

    /* 2️⃣ Match parameter from JSON */
    const matchedParameter = findParameterMatch(message);

    let kevaMedicines = [];

    if (matchedParameter) {
      kevaMedicines = matchedParameter.kevaMedicines;
    }

    /* 3️⃣ Append controlled medicines */
    let finalReply = aiReplyRaw;

    if (kevaMedicines.length > 0) {
      finalReply += `

Keva Medicines:
${kevaMedicines.map((med) => `• **${med}**`).join("\n")}
`;
    }

    /* 4️⃣ Save to DB */
    const consultation = await Consultation.create({
      user: req.user._id,
      messages: [
        { role: "user", content: message },
        { role: "assistant", content: finalReply },
      ],
      medicinesMentioned: kevaMedicines,
    });

    res.json({
      reply: finalReply,
      medicines: kevaMedicines,
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

/* ================= CLEAR CHAT ================= */
export const clearMyConsultations = async (req, res) => {
  try {
    await Consultation.deleteMany({
      user: req.user._id,
    });

    res.json({ message: "Chat history cleared successfully" });
  } catch (err) {
    console.error("Clear chat error:", err);
    res.status(500).json({ message: "Failed to clear chat" });
  }
};