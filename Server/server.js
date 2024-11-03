import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path"; // Import the 'path' module
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js"


const server = express();
dotenv.config();

// Middleware
server.use(bodyParser.json());
server.use(cors());

// Database connection
const PORT = process.env.PORT || 4000;
const URL = process.env.DATABASE_URL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to DATABASE");

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));

// Routes

server.use("/api/blog",blogRoutes);
server.use("/api/user", userRoutes);

// Serve static files from 'public' folder
server.use('/public', express.static(path.join(process.cwd(), 'public')));
