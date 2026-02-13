import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],

    aiSummary: String,      // short diagnosis
    recommendedMedicines: [String],
    recommendedFoods: [String],
    recommendedExercises: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Consultation", consultationSchema);