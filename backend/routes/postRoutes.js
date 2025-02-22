import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    console.log(posts);
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching posts",
    });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo, {
      folder: "ai_generated_images",
    });

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.secure_url,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error creating post",
    });
  }
});

export default router;
