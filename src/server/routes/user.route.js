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

//register a new user
routes.post("/register", registerUser);

//login by user
routes.post("/login", loginUser);

//get user profile
routes.get("/profile", authMiddleware, getProfile);

//get admin dashboard
routes.get(
    "/admin/dashboard", authMiddleware,
    roleMiddleware("Admin"),
    adminDashboard
);

module.exports = routes;