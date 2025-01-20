import mongoose from "mongoose";
import bcrypt from "bcrypt";

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserSchema = mongoose.model("User", User);

export default UserSchema;
