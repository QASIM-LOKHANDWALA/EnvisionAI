import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import clipdropRoutes from "./routes/clipdropRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/auth", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/clipdrop", clipdropRoutes);

// app.get("/", async (req, res) => {
//   res.send("Hello");
// });

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(8080, () => {
      console.log("Server started on port : 8080");
    });
  } catch (err) {
    console.log(`Error occured : ${err}`);
  }
};
startServer();
