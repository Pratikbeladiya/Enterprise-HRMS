const express = require("express");
const routes = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

const {
  registerUser,
  loginUser,
  getProfile
} = require("../controllers/user.controller");

routes.post("/register", registerUser);

routes.post("/login", loginUser);

routes.get("/profile", authMiddleware, getProfile);

module.exports = routes;