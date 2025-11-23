const User = require("../models/userModel");

// ➝ CREATE User with profileImg
const createUser = async (req, res) => {
  try {
    const { name, email, address, mobileNumber, age, gender } = req.body;
    // Validate gender (optional but recommended)
    const allowedGenders = ["male", "female", "other"];
    if (!allowedGenders.includes(gender)) {
      return res.status(400).json({ message: "Gender must be male, female, or other" });
    }
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
      gender,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ➝ READ all Users
const getUsers = async (req, res) => {
  try {
    // 👉 Query Parameters
    let { page = 1, limit = 10, search = "", gender } = req.query;

    // Convert page & limit to numbers
    page = Number(page);
    limit = Number(limit);

    // 👉 Build search filter
    const filter = {};

    // Search by name OR address (case-insensitive)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        // { address: { $regex: search, $options: "i" } },
      ];
    }

    // 👉 Gender filter (optional)
    if (gender) {
      filter.gender = gender;
    }

    // 👉 Pagination
    const skip = (page - 1) * limit;

    // 👉 Fetch users with sorting
    const users = await User.find(filter)
      .sort({ createdAt: -1 }) // latest data first
      .skip(skip)
      .limit(limit);

    // 👉 Total Count for frontend pagination
    const totalUsers = await User.countDocuments(filter);

    res.json({
      page,
      limit,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      users,
    });
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
  if (updates.gender) {
      const allowedGenders = ["male", "female", "other"];
      if (!allowedGenders.includes(updates.gender)) {
        return res.status(400).json({ message: "Gender must be male, female, or other" });
      }
    }
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
