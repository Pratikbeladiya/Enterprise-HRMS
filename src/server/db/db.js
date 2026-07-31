 const mongoose = require("mongoose");

 async function ConnectToDb(){
    await mongoose.connect(process.env.MONGO_URI)

    .then (()=>{
        console.log("database connected successfully");
     }).catch (()=>{
        console.log("database not connected");
          
         })
 }

 module.exports=ConnectToDb;

