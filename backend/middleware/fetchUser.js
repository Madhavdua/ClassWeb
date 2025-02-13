const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtkey = process.env.PRIVATE_KEY||"i am the key";

const fetchUser=async(req,res,next)=>{
    let token =req.header('auth-token');
    console.log(token);
    if(!token){
        return res.status(401).send({success:false,error:"Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,jwtkey);
        if(!data){
            return res.status(401).send({success:false,error:"Please authenticate using a valid cred"})
        }
        req.user=data;
        next();
    } catch (error) {
        console.log(error)
       return  res.status(401).send({success:false,error:"Error in authentication"})
    }
}
module.exports=fetchUser
