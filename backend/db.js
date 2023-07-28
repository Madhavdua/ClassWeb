const mongoose=require("mongoose");

const connect= async(uri)=>{
    await mongoose.connect(uri);
    console.log("db connected")
}
module.exports={connect};