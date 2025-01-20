import express from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import UserSchema from "../mongodb/models/user.js";

const router = express.Router();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("All fields must be filled.");
    }

    const user = await UserSchema.findOne({ email });
    if (!user) {
      throw Error("Incorrect Email.");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect Password.");
    }

    const token = createToken(user._id);
    res.status(200).json({ email, token, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message, success: false });
  }
});

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
    const token = createToken(user._id);
    res.status(200).json({ email, token, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message, success: false });
  }
});

export default router;
