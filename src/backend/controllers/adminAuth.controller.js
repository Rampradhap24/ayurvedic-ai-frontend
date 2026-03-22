import Admin from "../models/Admin.js";

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin || admin.password !== password) {
      return res.status(401).json({
        message: "Invalid admin credentials",
      });
    }

    res.json({
      message: "Login successful",
      role: "admin",
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};