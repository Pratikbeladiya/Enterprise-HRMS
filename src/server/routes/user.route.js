const express = require("express");
const routes = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const {
  registerUser,
  loginUser,
  getProfile,
  adminDashboard
} = require("../controllers/user.controller");

routes.post("/register", registerUser);

routes.post("/login", loginUser);

routes.get("/profile", authMiddleware, getProfile);

routes.get(
    "/admin/dashboard", authMiddleware,
    roleMiddleware("Admin"),
    adminDashboard
);

module.exports = routes;