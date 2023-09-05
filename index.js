const express=require("express");
const app=express();
require("dotenv").config();
const connect=require("./db");
app.use(express.json());
const {routeBlogs}=require("./blogs");
const{routeLoginSignup}=require("./loginSignup");

const PORT=process.env.PORT;

app.get("/",(req,res)=>{
    res.send({msg:"Welcome to blogs application (backend)"})
})

app.use("/user",routeLoginSignup);
app.use("/blogs",routeBlogs);



app.listen(PORT,async()=>{
try {
    await connect;
    console.log("Sucessfully Connected");
} catch (error) {
    console.log(error)
}
})


