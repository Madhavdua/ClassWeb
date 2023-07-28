const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    group_list:{
        type:Array,
        default:[]
    }
})
const User=mongoose.model("User",UserSchema);
module.exports=User;