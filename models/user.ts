import mongoose from "mongoose";
import {number} from "prop-types";
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
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: number,
    default: false,
  },
  forgotPasswardToken: String,
  forgotPasswardTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  createTime: Date,
  createUser: String,
  // 0 for not delete, 1 for delete
  isDelete: number,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
