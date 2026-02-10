import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    age: String,
    height: String,
    weight: String,
    workType: String,
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);