const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const {isValid,isValidEmail,isValidMobile,isValidPassword} = require("../util/validation")
require('dotenv').config();
const { SECRET_KEY } = process.env;

const { isValidObjectId } = require('mongoose');
// const isValid = function (value) {
//     if (typeof value === "undefined" || value === null) return false;
//     if (typeof value === "string" && value.trim().length === 0) return false;
//     return true;
// };


async function hashpass(req,res,next){
    try {
        if(!req.body.password){
            res.status(400).send({msg : "password is missing" })
         }
         console.log(req.body.password)
         if (!isValidPassword(req.body.password)) {
            return res.status(400).send({ status: false, message: "password pattern is wrong" });
        }
         const pass = await bcrypt.hash(req.body.password,8)
    
         req.body.password = pass
        //  console.log(pass)

         next()
    } catch (error) {
        res.status(500).send({msg : error.message})
    }
}

async function auth(req,res,next){
    try {
        const token = req.headers['x-api-key']
        // console.log(token)
        if(!token){
            res.status(401).send({status : false , msg : "token is absent"})
        }
        const decode = jwt.verify(token,process.env.JWT_KEY) //rush
        if(!decode){
            res.status(400).send({status : false , msg : "not autherized"})
        }
        req.decoded = decode
        
        

         next()
    } catch (error) {
        res.status(500).send({msg : error.message})
    }
}


const authorization = async function (req, res, next) {
    try {
        const loggedinUserId = req.userId;
        const paramUserId = req.params.userId
        if (!isValid(paramUserId)) {
            return res.status(400).send({ status: false, message: "invalid userId" });
        }
        const getData = await User.findById(paramUserId);
        if (!getData) {
            return res.status(404).send({ status: false, message: "data does not found" });
        }
        if (loggedinUserId !== paramUserId) {
            return res.status(403).send({ status: false, message: "not authorized" });
        }
        next();
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


module.exports = {hashpass,auth,authorization}