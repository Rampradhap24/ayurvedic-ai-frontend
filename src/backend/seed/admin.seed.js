import Admin from "../models/Admin.js";

const seedAdmin = async () => {
  const existing = await Admin.findOne({ username: "admin" });

  if (!existing) {
    await Admin.create({
      username: "admin",
      password: "admin@123",
    });

    console.log("");
  } else {
    console.log("");
  }
};

export default seedAdmin;