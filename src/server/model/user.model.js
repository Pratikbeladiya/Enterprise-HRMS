const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    contactNumber: {
      type: Number,
      required: true
    },

    password: {
      type: String,
      required: true
    },

     role: {
       type: String,
       enum: ["Admin", "HR", "Employee"],
       default: "Employee"
     },

     department: {
       type: String,
       default: "General"
     },
   
    
     timestamps:{
       type: Date,
       default: Date.now
  }

  });

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

