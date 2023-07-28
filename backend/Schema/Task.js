const mongoose=require("mongoose");
const {Schema}=mongoose;
const TaskSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        default:"new task"
    },
    code:{
        type:String,
        required:true
    },
    assigned_date:{
        type:String,
        default:''
    },
    file:{
        type:String,
        default:""
    },
    status:{
        type:Boolean,
        default:false,
    }
})
const Task=mongoose.model("Task",TaskSchema);
module.exports =Task;