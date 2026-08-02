const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    client: { type: String, required: true, trim: true },
    manager: { type: String, required: true, trim: true },
    teamSize: { type: Number, default: 1, min: 1 },
    budget: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: ["Planning", "In Progress", "Completed", "On Hold"],
      default: "In Progress",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    completedTasks: { type: Number, default: 0, min: 0 },
    totalTasks: { type: Number, default: 1, min: 1 },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
