const express = require("express");
const router = express.Router();
const { getAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } = require("../controllers/announcement.controller");

router.get("/", getAllAnnouncements);
router.post("/", createAnnouncement);
router.put("/:id", updateAnnouncement);
router.delete("/:id", deleteAnnouncement);

module.exports = router;
