import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";
import FormData from "form-data";

dotenv.config();

const router = express.Router();

const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY;
const CLIPDROP_API_URL = "https://clipdrop-api.co/text-to-image/v1";

router.route("/").get((req, res) => {
  res.send("Hello from ClipDrop Text-to-Image API");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const formData = new FormData();
    formData.append("prompt", prompt);

    const response = await axios.post(CLIPDROP_API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        "x-api-key": CLIPDROP_API_KEY,
      },
      responseType: "arraybuffer",
    });

    const base64Image = Buffer.from(response.data).toString("base64");
    const imageUrl = `data:image/png;base64,${base64Image}`;

    // console.log(imageUrl);

    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    res
      .status(500)
      .send(error?.response?.data || error?.message || "Something went wrong");
  }
});

export default router;
