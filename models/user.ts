//models/user.ts

import mongoose from "mongoose";
import { number } from "prop-types";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  locale: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswardToken: String,
  forgotPasswardTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  loginCode: String,
  loginCodeExpiry: Date,
  // 0 for valid, 1 for delete
  isDelete: {
    type: Number,
    default: 0,
  },
  plan: {
    type: String,
    enum: ['free', 'premium', 'enterprise'],
    default: 'free'
  },
  ts: Date,
  mt: Date,
  lts: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;