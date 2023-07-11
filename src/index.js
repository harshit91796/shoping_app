const express = require("express")
const app = express()
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const multer = require("multer")
// const aws= require("aws-sdk")
const router = require("../src/routes/routes.js")
dotenv.config()

app.use(express.json())

mongoose.connect((process.env.URL)).then(()=>{
    console.log("data base is connected")
}).catch(
    err => console.log(err)
)

app.use(multer().any())

app.use("/",router)

app.listen(process.env.PORT,(req,res)=>{
    console.log("server is on")
})