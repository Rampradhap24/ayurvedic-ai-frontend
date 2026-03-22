import Inventory from "../models/Inventory.js";

/* ================= GET INVENTORY (USER SIDE) ================= */
export const getInventory = async (req, res) => {
  try {
    // Only show active products in user store
    const items = await Inventory.find({ isActive: true });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= ADMIN: GET ALL ================= */
export const getAllInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= ADMIN: ADD ITEM ================= */
export const addItem = async (req, res) => {
  try {
    const { name, price, discount, stock, image } = req.body;

    let imagePath = "";

    // ✅ PRIORITY 1: file upload
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    // ✅ PRIORITY 2: URL or base64
    else if (image) {
      imagePath = image;
    }

    const newItem = await Inventory.create({
      name,
      image: imagePath, // ✅ FIXED
      price: Number(price),
      discount: Number(discount) || 0,
      stock: Number(stock) || 0,
      isActive: true,
    });

    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
/* ================= ADMIN: UPDATE ITEM ================= */
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("👉 Update Request ID:", id);
    console.log("👉 Body:", req.body);

    // ✅ Validate ID
    if (!id) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }

    // ✅ Safe update fields
    const updateData = {};

    if (req.body.price !== undefined) {
      updateData.price = Number(req.body.price);
    }

    if (req.body.discount !== undefined) {
      updateData.discount = Number(req.body.discount);
    }

    if (req.body.stock !== undefined) {
      updateData.stock = Number(req.body.stock);
    }

    // 🚨 Important: do NOT send full item
    const updated = await Inventory.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    console.log("✅ Updated:", updated);

    res.json({
      message: "Updated successfully",
      data: updated,
    });

  } catch (err) {
    console.error("🔥 ERROR:", err); // VERY IMPORTANT

    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};
/* ================= ADMIN: DELETE ITEM ================= */
export const deleteItem = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};