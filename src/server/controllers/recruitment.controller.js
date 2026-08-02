const { Job, Candidate } = require("../model/recruitment.model");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// ── Jobs ─────────────────────────────────────────────────────────────────────

const getAllJobs = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    return successResponse(res, 200, "Jobs fetched successfully", { count: jobs.length, jobs });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const createJob = async (req, res) => {
  try {
    const { title, department, location } = req.body;
    if (!title || !department || !location) return errorResponse(res, 400, "Title, department and location are required");
    const job = await Job.create(req.body);
    return successResponse(res, 201, "Job requisition created successfully", job);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!job) return errorResponse(res, 404, "Job not found");
    return successResponse(res, 200, "Job updated successfully", job);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return errorResponse(res, 404, "Job not found");
    return successResponse(res, 200, "Job deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// ── Candidates ────────────────────────────────────────────────────────────────

const getAllCandidates = async (req, res) => {
  try {
    const { stage } = req.query;
    const filter = stage ? { stage } : {};
    const candidates = await Candidate.find(filter).populate("job", "title department").sort({ createdAt: -1 });
    return successResponse(res, 200, "Candidates fetched successfully", { count: candidates.length, candidates });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const createCandidate = async (req, res) => {
  try {
    const { name, email, position } = req.body;
    if (!name || !email || !position) return errorResponse(res, 400, "Name, email and position are required");
    const candidate = await Candidate.create(req.body);
    return successResponse(res, 201, "Candidate added to pipeline successfully", candidate);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!candidate) return errorResponse(res, 404, "Candidate not found");
    return successResponse(res, 200, "Candidate updated successfully", candidate);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) return errorResponse(res, 404, "Candidate not found");
    return successResponse(res, 200, "Candidate deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = { getAllJobs, createJob, updateJob, deleteJob, getAllCandidates, createCandidate, updateCandidate, deleteCandidate };
