const express = require("express");

const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtkey = process.env.PRIVATE_KEY;
console.log(jwtkey)

const fetchUser=async(req,res,next)=>{
    let token =req.header('auth-token');
    if(!token){
        return res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {
        const data =await jwt.verify(token,jwtkey);
        if(!data){
            return res.status(401).send({error:"Please authenticate using a valid cred"})
        }
        req.user=data;
        next();
    } catch (error) {
        console.log(error)
       return  res.status(401).send({error:"Error in authentication"})
    }
}
module.exports=fetchUser
