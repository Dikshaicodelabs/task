const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    token: { type: Number, default: 0 }, // Assuming users have tokens
  },
  { timestamps: true }
);

const User = mongoose.model('users', UserSchema);

module.exports = User;
