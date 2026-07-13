
const app =require("./app");
const ConnectToDb=require("./db/db");
require('dotenv').config();

ConnectToDb();



app.listen(3000,()=>{
    console.log("app is running on port 3000");
});