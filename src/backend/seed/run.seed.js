import dotenv from "dotenv";
import connectDB from "../config/db.js";
import seedInventory from "./inventory.seed.js";

dotenv.config();

await connectDB();
await seedInventory();

process.exit();