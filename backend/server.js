const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Project = require("./models/project.js");
require("dotenv").config();

const app = express();

// Execute Database Link
connectDB();

// Production Middleware
app.use(cors());
app.use(express.json());

// API ENDPOINTS

// 1. GET ALL PROJECTS FROM MONGO
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to gather database cluster array." });
  }
});

// 2. POST / PROVISION A NEW PROJECT IN MONGO
app.post("/api/projects", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Invalid schema request validation parameters." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 System Server executing smoothly on port ${PORT}`),
);
