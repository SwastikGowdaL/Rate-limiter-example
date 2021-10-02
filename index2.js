const express = require("express");
const slowDown = require("express-slow-down");

const app = express();

const port = 3001;

const limiter = slowDown({
    windowMs: 1 * 60 * 1000, // 1 minute
    delayAfter: 2, // allow 2 requests per 1 minute, then...
    delayMs: 1000, // begin adding 10 sec of delay per request above 2:
    maxDelayMs: 2000,
});

app.use(limiter);

app.get("/",(req,res)=>{
    console.log(req.slowDown);
    res.status(200).send("req processed"); 
})

app.listen(port,()=>{
console.log("listening on port - ", port); 
})