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

    /* 1️⃣ AI RESPONSE */
    const aiReplyRaw = await getAIResponse(message);

    if (!aiReplyRaw) {
      return res.status(500).json({
        message: "AI did not generate a response",
      });
    }

    /* 2️⃣ MATCH MEDICINES */
    const matchedParameter = findParameterMatch(message);

    let kevaMedicines = [];

    if (matchedParameter) {
      kevaMedicines = matchedParameter.kevaMedicines;
    }

    /* 3️⃣ BUILD FINAL RESPONSE */
    let finalReply = aiReplyRaw;

    /* ✅ ADD MEDICINES */
    if (kevaMedicines.length > 0) {
      finalReply += `

💊 Recommended Medicines:
${kevaMedicines.map((med) => `• **${med}**`).join("\n")}
`;
    }

    /* 🔥 ADD FOLLOW-UP + DOCTOR LOGIC */
    finalReply += `

⏳ Follow-up Advice:
Take the above medicines regularly for 2–3 days.

If symptoms are not improving or worsen,
please consult a doctor for proper diagnosis.
`;

    /* 4️⃣ SAVE TO DB */
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
      suggestDoctor: true, // 🔥 used in frontend
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
    console.error("Fetch consultations error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= CLEAR CHAT ================= */
export const clearMyConsultations = async (req, res) => {
  try {
    await Consultation.deleteMany({
      user: req.user._id,
    });

    res.json({
      message: "Chat history cleared successfully",
    });

  } catch (err) {
    console.error("Clear chat error:", err);
    res.status(500).json({
      message: "Failed to clear chat",
    });
  }
};