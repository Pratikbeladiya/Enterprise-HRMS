const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

const authRoute = require("./routes/user.route");

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security Middleware
app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Maximum 100 requests
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests, please try again after 15 minutes."
    }
});
app.use(limiter);

// Routes
app.use("/api/user", authRoute);

module.exports = app;