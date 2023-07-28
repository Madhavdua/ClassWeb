const express = require("express");
const router = express.Router();

const fetchUser=require("../middleware/fetchUser");
const Group=require('../Schema/Group');
const User=require('../Schema/User');
const Task=require('../Schema/Task');

const { check, validationResult } = require("express-validator")

router.post('/creategroup',fetchUser,
check('title').isLength({min:3}),
    async (req,res)=>{
        let error=validationResult(req);
        if(!error.isEmpty()){
            return res.json({success: false, error: "Group title too short" });
        }
        try {
            let grp = await Group.findOne({ title: req.body.title });
        if (grp) {
            return res.json({success: false, error: "Group with this title already exist" });
        }
        const code=Math.floor(100000 + Math.random() * 900000).toString();
        grp=await Group.create({
            title:req.body.title,
            description:req.body.description||"New group",
            code:code,
            admin:req.user.id
        })
        let update=await User.findByIdAndUpdate({_id:req.user.id},{$push:{group_list:code}});
        return res.json(grp);
        } catch (error) {
            return res.status(501).json({error:error});
        }
    }
)
router.post('/addgroup',fetchUser,
check('code').isLength({min:6}),
    async (req,res)=>{
        let error=validationResult(req);
        if(!error.isEmpty()){
            return res.json({success: false, error: "Invalid code" });
        }
        try {
            let grp = await Group.findOne({ code: req.body.code });
        if (!grp) {
            return res.json({success: false, error: "No such group exist" });
        }
        let user=await User.findOne({_id:req.user.id});
        let grp_list=await user.group_list;
        if(grp_list.includes(req.body.code)){
            return res.json({success: false, error: "Group already exist" });
        }
        let update=await User.findByIdAndUpdate({_id:req.user.id},{$push:{group_list:req.body.code}});
        return res.json({success:true,msg:"group added successfully"});
        } catch (error) {
            return res.status(501).json({error:error});
        }
    }
)

router.get('/fetchgroups',fetchUser,
async(req,res)=>{
    try {
        const  user=await User.findOne({_id:req.user.id});
        const grp_list=user.group_list;
        if(grp_list.length==0){
            return res.status(200).json({success: false, error: "No enrolled groups" });
        }

        let result=await Group.find({code:{$in:grp_list}});
        return res.json(result);
    } catch (error) {
        return res.status(500).json({success: false,error:error});
    }
}
)
router.delete('/removegroup/:code',fetchUser,
check('code').isLength({min:6}),
async (req,res)=>{
    let error=validationResult(req);
    if(!error.isEmpty()){
        return res.json({success: false, error: "Invalid request" });
    }
    try {
    let update=await User.findByIdAndUpdate({_id:req.user.id},{$pull:{group_list:req.params.code}});
    return res.json({success:true});
    } catch (error) {
        return res.status(501).json({success:false,error:error});
    }
}
)
router.delete('/deletegroup/:code',fetchUser,
check('code').isLength({min:6}),
async (req,res)=>{
    let error=validationResult(req);
    if(!error.isEmpty()){
        return res.json({success: false, error: "Invalid request" });
    }
    try {
        
    let grp=await Group.findOneAndDelete({code:req.params.code});
    let tsk=await Task.deleteMany({code:req.params.code});
    let userUpdate=await User.updateMany({group_list:req.params.code},{$pull:{group_list:req.params.code}});
    return res.json({success:true});

    // return res.json({success:true});
    } catch (error) {
        return res.status(500).json({error:error});
    }
}
)


module.exports=router;