const Announcement = require("../model/announcement.model");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// Get all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ isPinned: -1, createdAt: -1 });
    return successResponse(res, 200, "Announcements fetched successfully", { count: announcements.length, announcements });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Create announcement
const createAnnouncement = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return errorResponse(res, 400, "Title and content are required");
    const announcement = await Announcement.create(req.body);
    return successResponse(res, 201, "Announcement published successfully", announcement);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Update announcement
const updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!announcement) return errorResponse(res, 404, "Announcement not found");
    return successResponse(res, 200, "Announcement updated successfully", announcement);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Delete announcement
const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) return errorResponse(res, 404, "Announcement not found");
    return successResponse(res, 200, "Announcement deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = { getAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement };
