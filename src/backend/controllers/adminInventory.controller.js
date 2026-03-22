import Inventory from "../models/Inventory.js";

/* GET ALL */
export const getAllInventory = async (req, res) => {
  const items = await Inventory.find();
  res.json(items);
};

/* ADD */
export const addMedicine = async (req, res) => {
  const { name, description, image, price, discount, stock, category } = req.body;

  const newItem = await Inventory.create({
    name,
    description,
    image,
    price,
    discount,
    stock,
    category,
  });

  res.json(newItem);
};

/* UPDATE */
export const updateMedicine = async (req, res) => {
  const updated = await Inventory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};

/* DELETE */
export const deleteMedicine = async (req, res) => {
  await Inventory.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};