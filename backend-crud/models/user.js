const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, require: true, minlength: 5, maxlength: 50 },
  phone: { type: String, required: true, minlength: 5, maxlength: 50 },
  isPremium: { type: Boolean, default: false },
  address: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const User = mongoose.model("User", userSchema);

exports.userSchema = userSchema;
exports.User = User;
