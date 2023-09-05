const express=require("express");
const routeLoginSignup=express.Router();
const bcrypt=require("bcryptjs");
const UserModel=require("./userModel");
var jwt = require('jsonwebtoken');
require("dotenv").config();

const SECRETCODE=process.env.SECRETCODE;

routeLoginSignup.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;
    await bcrypt.genSalt(10, async function(err, salt) {
         await  bcrypt.hash(password, salt, async function(err, hash) {
               if(!err){
                const model= await UserModel({
                name:name,email:email,password:hash
                })
                model.save();
                    console.log("signup sucessfull");
                    res.send({msg:"Signup Sucessfull"});
               }else{
                console.log("error");
                res.send({msg:"error"});
               }
            });
        });

        })

      routeLoginSignup.post("/login",async(req,res)=>{
              const {email,password}=req.body;
                  try {
                    const clint=await UserModel.findOne({email:email});
                    console.log(clint);
                    if(clint){
                        await bcrypt.compare(password, clint.password, async function(err, res1) {
                                if(res1){
                                    try {
                                        const token = await jwt.sign({ userID: clint._id }, SECRETCODE);
                                    res.send({msg:"sucessfully login",token:token});
                                    } catch (error) {
                                        console.log(error)
                                        res.send({msg:error})
                                    }
                                }else{
                                    console.log("Not a existing user");
                                    res.send("not a existing user");
                                }
                            
                         });
                    }
                       


                        

             //const token =await jwt.sign({ userID: "jj" }), SECRETCODE);
            } catch (error) {
                  console.log(error)
                  }
                 })


                 module.exports={routeLoginSignup}