import Inventory from "../models/Inventory.js";
import { inventoryData } from "../data/inventory.data.js";

export const syncInventory = async () => {
  for (const item of inventoryData) {
    await Inventory.findOneAndUpdate(
      { name: item.name },   // 🔑 unique identifier
      {
        $set: {
          description: item.description,
          price: item.price,
          stock: item.stock,
          category: item.category,
          isActive: true,
        },
      },
      { upsert: true, new: true }
    );
  }

  console.log("✅ Inventory synced successfully");
};