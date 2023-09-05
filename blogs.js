const express=require("express");
const routeBlogs=express.Router();
const BlogModel=require("./blogsModel");

routeBlogs.get("/",async(req,res)=>{
    try {
        const data=await BlogModel.find();
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send({msg:"something went wrong"});
    }
})


routeBlogs.post("/post",async(req,res)=>{
    const {Title,Category,Author,Content,Image,userID}=req.body;
    //const userID=req.userID;
    try {
        const model=BlogModel({
           Title:Title,Category:Category,Author:Author,Content:Content,Image:Image,userID:userID 
        })
        model.save();
        console.log("sucessfully saved");
        res.send("Saved");
    } catch (error) {
        console.log(error);
        res.send({msg:"error"});
    }
})

module.exports={routeBlogs};