const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");


const app = express();

const authRoute = require("./routes/user.route");
const employeeRouter =require ("./routes/employee.route.js");
const departmentRoute = require("./routes/department.route");
const dashboardRoute = require("./routes/dashboard.route");
const attendanceRoute = require("./routes/attendance.route");
const payrollRoute = require("./routes/payroll.route");
const leaveRoute = require("./routes/leave.route");

const errorHandler = require("./middleware/error.middleware");

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable("x-powered-by");

// Security Middleware
app.use(helmet());

app.use(
  cors({
    origin:  process.env.CLIENT_URL,
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
app.use("/api/employees", employeeRouter);
app.use("/api/departments", departmentRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/payroll", payrollRoute);
app.use("/api/leave", leaveRoute);

app.use(errorHandler);


module.exports = app;