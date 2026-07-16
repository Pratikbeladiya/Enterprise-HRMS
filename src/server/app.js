const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

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

// Routes
app.use("/api/user", authRoute);

module.exports = app;