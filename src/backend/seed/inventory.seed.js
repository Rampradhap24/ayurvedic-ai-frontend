import Inventory from "../models/Inventory.js";
import inventoryData from "../data/inventory.data.js";

const seedInventory = async () => {
  try {
    for (const item of inventoryData) {
      const exists = await Inventory.findOne({ name: item.name });

      if (!exists) {
        await Inventory.create(item);
      }
    }

    console.log("");
  } catch (err) {
    console.error("❌ Inventory seed failed:", err.message);
  }
};

export default seedInventory;