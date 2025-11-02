const User = require("../models/userModel");

// ➝ CREATE User with profileImg
const createUser = async (req, res) => {
  try {
    const { name, email, address, mobileNumber, age } = req.body;
    
    // If file uploaded, create full URL
    let profileImg = null;
    if (req.file) {
      profileImg = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const user = await User.create({
      name,
      email,
      address,
      mobileNumber,
      age,
      profileImg,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ➝ READ all Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➝ READ single User
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➝ UPDATE User with profileImg
const updateUser = async (req, res) => {
  try {
    const updates = req.body;

    if (req.file) {
      updates.profileImg = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// ➝ DELETE User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
