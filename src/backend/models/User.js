import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    // 🔥 PROFILE FIELDS
    age: Number,
    height: Number,
    weight: Number,
    gender: String,
    workType: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);