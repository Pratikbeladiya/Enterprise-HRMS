const express = require("express");
const app = express();//server create successfully
const authRoute = require("./routes/user.route");

app.use(express.json());

app.use("/api",authRoute);



module.exports=app;