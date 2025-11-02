const express = require("express");
const upload = require("../middlewares/upload");
const { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} = require("../controllers/userController");

const router = express.Router();

// Use upload.single("profileImg") for single file upload
router.post("/", upload.single("profileImg"), createUser);
router.get("/", getUsers);          // Read all
router.get("/:id", getUserById);    // Read one
router.put("/:id", upload.single("profileImg"), updateUser);
router.delete("/:id", deleteUser);  // Delete

module.exports = router;
