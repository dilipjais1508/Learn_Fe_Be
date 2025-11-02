const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  mobileNumber: { type: Number, required: true },
  age: { type: Number, required: true },
  profileImg: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema)