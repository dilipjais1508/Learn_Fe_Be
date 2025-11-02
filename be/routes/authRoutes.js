const express = require("express");
//const { resetPassword } = require("../controllers/authController");
const router = express.Router();
const { signup, login, forgetPassword,resetPassword } = require("../controllers/authController");

// Routes
router.post("/signup", signup);
router.post("/login", login);

// 🔹 New Routes
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
