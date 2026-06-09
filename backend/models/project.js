const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Planning", "In Progress", "Completed"],
      default: "Planning",
    },
    lead: { type: String, default: "Abdulrahman Abass" },
    progress: { type: Number, default: 0, min: 0, max: 100 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", ProjectSchema);
