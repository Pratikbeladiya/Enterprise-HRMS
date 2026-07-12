const express = require("express");
    const routes = express.Router();
    const userModel = require("../model/user.model")

    routes.post("/register",async (req,res)=>{
    
           const {username,email,contactNumber,password}=req.body;
           const user= await userModel.create({
             username,email,contactNumber,password
           });
           res.status(201).json({
            message:"okay your data is successfully inserted",
            user
            });
            
         });
            
    

    routes.get("/login",async (req,res)=>{
          const{username,password}=req.body;
            const isUserExist = await userModel.findOne({
               username:username
             })
             if(!isUserExist){
                return res.status(401).json({
                    message:"user accont not found"
                })
             }
             const isPasswordValid = password==isUserExist.password;
             if(!isPasswordValid){
                return res.status(401).json({
                    message:"password is not valid"
                })
             }
             res.status(200).json({
                message:"User logged In successfully"
             })


    });


module.exports = routes;

