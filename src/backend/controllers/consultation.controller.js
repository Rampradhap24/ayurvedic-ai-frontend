import Consultation from "../models/Consultation.js";

export const saveConsultation = async (req, res) => {
  const { symptoms, aiResponse } = req.body;

  const consultation = await Consultation.create({
    user: req.user._id,
    symptoms,
    aiResponse,
  });

  res.json(consultation);
};

export const getMyConsultations = async (req, res) => {
  const data = await Consultation.find({ user: req.user._id });
  res.json(data);
};