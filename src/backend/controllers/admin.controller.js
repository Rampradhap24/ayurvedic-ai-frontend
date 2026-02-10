import User from "../models/User.js";
import Consultation from "../models/Consultation.js";

export const getUsers = async (req, res) => {
  res.json(await User.find());
};

export const getConsultations = async (req, res) => {
  res.json(await Consultation.find().populate("user"));
};