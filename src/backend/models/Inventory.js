import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    image: {
      type: String, // image URL
    },

    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0, // percentage
    },

    stock: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/* ✅ Virtual Final Price */
inventorySchema.virtual("finalPrice").get(function () {
  if (this.discount > 0) {
    return this.price - (this.price * this.discount) / 100;
  }
  return this.price;
});

inventorySchema.set("toJSON", { virtuals: true });

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;