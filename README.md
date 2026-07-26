# 🚀 Enterprise HRMS & Payroll Automation System (Backend)

## 📌 Project Overview

Enterprise HRMS & Payroll Automation System is a RESTful backend application built using Node.js, Express.js, MongoDB, and Mongoose. It provides secure employee management, payroll processing, attendance tracking, leave management, authentication, and role-based authorization for enterprise organizations.

---

# 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- Helmet
- CORS
- Express Rate Limiter
- Postman
- Git & GitHub

---

# 📁 Project Architecture

- MVC Architecture
- REST API Design
- Modular Routing
- Middleware-Based Authentication
- Role-Based Authorization (RBAC)
- Centralized Error Handling
- Standardized API Responses

---

# ✅ Week 1 Development

## 🔐 Authentication Module

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Token Authentication
- Protected Routes

---

## 👥 Employee Management

- Create Employee
- Get All Employees
- Get Employee By ID
- Update Employee
- Delete Employee

### Additional Features

- Search Employees
- Department Filter
- Designation Filter
- Active/Inactive Filter
- Pagination
- Sorting

---

## 🏢 Department Management

- Create Department
- Get All Departments
- Get Department By ID
- Update Department
- Delete Department

---

## 🔒 Security Features

- Helmet Security
- CORS Configuration
- API Rate Limiting
- JWT Authentication
- Role-Based Authorization (RBAC)

---

# ✅ Week 2 Development

## 📅 Attendance Module

### CRUD APIs

- Create Attendance
- Get All Attendance
- Get Attendance By ID
- Update Attendance
- Delete Attendance

### Enterprise Features

- Employee Attendance History
- Attendance Summary
- Monthly Attendance Report

---

## 💰 Payroll Module

### CRUD APIs

- Create Payroll
- Get All Payrolls
- Get Payroll By ID
- Update Payroll
- Delete Payroll

### Enterprise Features

- Net Salary Calculation
- Payroll History
- Monthly Payroll Summary
- Dashboard Analytics
- Search
- Filter
- Pagination
- Sorting
- Duplicate Payroll Prevention

---

## 🌴 Leave Management Module

### CRUD APIs

- Create Leave
- Get All Leaves
- Get Leave By ID
- Update Leave
- Delete Leave

### Enterprise Features

- Apply Leave
- Approve Leave
- Reject Leave
- Employee Leave History
- Leave Summary Dashboard
- Leave Validation
- Overlapping Leave Prevention
- Date Validation
- Total Leave Days Validation

---

# ⚡ API Standardization

Implemented centralized API response utility.

### Success Response

```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# 🛡 Global Error Handling

- Centralized Error Middleware
- Consistent Error Responses
- Reduced Duplicate Code

---

# 🔗 Database Features

- MongoDB Atlas
- Mongoose ODM
- Schema Validation
- Population (Employee ↔ Department)
- Relationship Handling

---

# 🧪 API Testing

All APIs tested successfully using Postman.

### Tested Modules

- Authentication
- Employee
- Department
- Attendance
- Payroll
- Leave

---

# 📊 REST API Modules

- Authentication API
- Employee API
- Department API
- Attendance API
- Payroll API
- Leave API

---

# 🚀 Enterprise Features Implemented

- JWT Authentication
- Role-Based Authorization
- Password Encryption
- CRUD Operations
- Search
- Filtering
- Pagination
- Sorting
- Dashboard Analytics
- Attendance Reports
- Payroll Reports
- Leave Workflow
- Validation
- Global Error Handling
- Standardized API Responses
- MongoDB Relationships
- RESTful API Design

---

# 📌 Project Status

✅ Week 1 Completed

✅ Week 2 Completed

🚀 Enterprise Backend Development Successfully Completed

## 📈 Project Statistics

- Authentication APIs
- Employee Management
- Department Management
- Attendance Management
- Payroll Management
- Leave Management
- Search, Filter & Pagination
- JWT Security
- RBAC
- Global Error Handling
- Standardized API Responses
- MongoDB Relationships
- RESTful Architecture
