const express = require("express");
const router = express.Router();
const {
  getAllJobs, createJob, updateJob, deleteJob,
  getAllCandidates, createCandidate, updateCandidate, deleteCandidate,
} = require("../controllers/recruitment.controller");

// Job requisition routes
router.get("/jobs", getAllJobs);
router.post("/jobs", createJob);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);

// Candidate pipeline routes
router.get("/candidates", getAllCandidates);
router.post("/candidates", createCandidate);
router.put("/candidates/:id", updateCandidate);
router.delete("/candidates/:id", deleteCandidate);

module.exports = router;
