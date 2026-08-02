const mongoose = require("mongoose");

// Job Requisition Schema
const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    type: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Internship"],
      default: "Full-Time",
    },
    experience: { type: String, default: "1-3 Years" },
    salaryRange: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Open", "In Review", "Closed"],
      default: "Open",
    },
    applicantsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Candidate Schema
const candidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: "" },
    position: { type: String, required: true },
    stage: {
      type: String,
      enum: ["Screening", "Interview Scheduled", "Offer Extended", "Hired", "Rejected"],
      default: "Screening",
    },
    matchScore: { type: String, default: "N/A" },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", default: null },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = { Job, Candidate };
