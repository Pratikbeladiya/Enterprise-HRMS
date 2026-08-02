const Project = require("../model/project.model");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    return successResponse(res, 200, "Projects fetched successfully", { count: projects.length, projects });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Create project
const createProject = async (req, res) => {
  try {
    const { name, client, manager, dueDate } = req.body;
    if (!name || !client || !manager || !dueDate) return errorResponse(res, 400, "Name, client, manager and due date are required");
    const project = await Project.create(req.body);
    return successResponse(res, 201, "Project created successfully", project);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return errorResponse(res, 404, "Project not found");
    return successResponse(res, 200, "Project updated successfully", project);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return errorResponse(res, 404, "Project not found");
    return successResponse(res, 200, "Project deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = { getAllProjects, createProject, updateProject, deleteProject };
