const express=require("express")
const router=express();

const fetchUser=require('../middleware/fetchUser');
const { check, validationResult } = require("express-validator")

const Task=require('../Schema/Task');

// ***********uploading file****************
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      const name =` ${Math.floor(Math.random()*10000000)}-${file.originalname}`;
      cb(null, name);
    }

  })

  
const upload = multer({ storage: storage })
// ****************


router.post('/createtask',fetchUser,
check('title').isLength({min:5}),
async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty())return res.status(401).json({success:false,error:"Enter valid data"});
    try {
        let task = await Task.findOne({ title: req.body.title });
        if (task) {
            return res.status(401).json({success: false, error: "Task with this title already exist" });
        }
        task=await Task.create({
            title:req.body.title,
            description:req.body.description||"New Task",
            assigned_date:req.body.assigned_date||new Date().toDateString(),
            code:req.body.code,
            file:req.body.file||'',
            id:`${Math.random()*100000000}${req.body.title}`
        })
        return res.json({success:true});
    } catch (error) {
        return res.status(501).json({success:false,error:"Error occured"});
    }
})
router.get('/fetchtasks/:code',fetchUser,
async(req,res)=>{
    try {
        let result=await Task.find({code:req.params.code});
        return res.json(result);
    } catch (error) {
        return res.status(500).json({error:error});
    }
}
)
router.delete('/deletetask/:id',fetchUser,
async(req,res)=>{
    try {
        let task=await Task.findOneAndDelete({_id:req.params.id});
        return res.json({success:true});
    } catch (error) {
        return res.status(500).json({success:false,error:error});
    }
}
)



router.post('/fileupload',fetchUser,
upload.single('file'),
async(req,res)=>{
    // console.log(req.file);
    return res.json({msg:"File successfully submitted",filename:req.file.filename});
}
)

router.get('/showattachment/:id',fetchUser,
async(req,res)=>{
    try {
        const user=await Task.findOne({_id:req.params.id});
        if(user){
            const file=user.file;
            if(file.length>1){
                return res.status(200).json({success:true,file:file})
            }
        }
        return res.status(404).json({success:false,error:"No attachment found"})
        
    } catch (error) {
        // console.log(error)
        return res.status(500).json({success:false,error:"Error occured"})
    }
}
)

module.exports=router