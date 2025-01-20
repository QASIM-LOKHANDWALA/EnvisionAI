import express from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import UserSchema from "../mongodb/models/user.js";

const router = express.Router();

router.post("/login", async (req, res) => {});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("All fields must be filled.");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid.");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password is not strong enough.");
    }

    const exists = await UserSchema.findOne({ email });
    if (exists) {
      throw Error("Email already in use.");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await UserSchema.create({ email, password: hash });
    res.status(200).json({ email, user, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message, success: false });
  }
});

export default router;
