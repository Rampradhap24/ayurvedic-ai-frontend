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
    const {
      name,
      description,
      image,
      price,
      discount,
      stock,
      category,
      isActive,
    } = req.body;

    const newItem = await Inventory.create({
      name,
      description,
      image,
      price,
      discount,
      stock,
      category,
      isActive,
    });

    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ================= ADMIN: UPDATE ITEM ================= */
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Inventory.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
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