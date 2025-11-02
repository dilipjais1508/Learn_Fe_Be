const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthUser = require("../models/authModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");



// 👉 Signup Controller
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const userExists = await AuthUser.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await AuthUser.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Signup successful",
      user: { id: newUser._id, email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

// 👉 Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await AuthUser.findOne({ email, });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // ✅ Send bcrypt password hash (for debug/testing only)
    res.status(200).json({
      message: "Login successful",
      token,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};



// ---------- FORGET PASSWORD ----------
exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await AuthUser.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const message = `
  <div style="
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    margin: auto;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  ">
    <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
    <p style="color: #555; text-align: center;">
      We received a request to reset your password. Click the button below to reset it:
    </p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetUrl}" target="_blank" style="
        background-color: #007bff;
        color: white;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 6px;
        font-size: 16px;
        display: inline-block;
      ">
        Reset Password
      </a>
    </div>
    <p style="color: #777; text-align: center;">
      This link will expire in 15 minutes. If you didn’t request this, you can safely ignore this email.
    </p>
    <hr style="margin-top: 20px;">
    <p style="font-size: 12px; color: #aaa; text-align: center;">
      © ${new Date().getFullYear()} Auth System. All rights reserved.
    </p>
  </div>
`;


    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Auth System" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: message,
    });

    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Error sending reset email", error: error.message });
  }
};

// ---------- RESET PASSWORD ----------
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await AuthUser.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error: error.message });
  }
};

