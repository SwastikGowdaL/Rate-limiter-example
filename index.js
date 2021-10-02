const express = require("express");
const rateLimit = require("express-rate-limit");

const port = 3000;

const app = express();

const limiter = rateLimit({
    windowMs:1*60*1000, // 1 minute
    max : 2, // limit each IP to 2 requests per windowMs
    message:
    "Too many requests sent from this IP,so please try again after a minute"
})

app.use("/api",limiter);

app.get("/",(req,res)=>{
    res.status(200).send("req processed");
})

app.post("/api",(req,res)=>{
    console.log(req.rateLimit); 
    res.status(200).send("req processed");
})

app.listen(port,()=>{
    console.log("listening on port - ",port); 
})