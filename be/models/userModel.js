const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  mobileNumber: { type: Number, required: true },
  age: { type: Number, required: true },
  profileImg: { type: String },
  // 👉 Add gender field here
  gender: {
    type: String,
    enum: ["male", "female", "other"],  // allowed values
    required: true                      // make gender mandatory
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema)