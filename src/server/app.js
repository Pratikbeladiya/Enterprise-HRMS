const express = require("express");
const app = express();//server create successfully
const authRoute = require("./routes/user.route");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/user",authRoute);



module.exports=app;