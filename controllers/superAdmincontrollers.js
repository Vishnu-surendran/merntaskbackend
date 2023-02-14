const jwt=require("jsonwebtoken")
const superAdmin=require("../models/superAdminmodel")
const adminModel=require("../models/adminModel")
const bcrypt=require("bcrypt")
const product=require("../models/productModel")
 /* Creating jwt token */ 

const createToken=async(id)=>{
    return jwt.sign({id},process.env.PRIVATEKEY,{expiresIn:"1d"})
    }

 /* SuperAdmin Login */

 const superAdminlogin=async(req,res)=>{
    const {email,password}=req.body
try{
    const adminCheck=await superAdmin.login(email,password)
    const token=createToken(adminCheck._id)
    res.status(200).json(adminCheck)
}catch(error){
res.status(401).json(error.message)
}
   
 }

 const superAdminsignup=async(req,res)=>{
  
    const {email,password}=req.body
try{
    const adminCheck=await superAdmin.Signup(email,password)
    const token=createToken(adminCheck._id)
    res.status(200).json(adminCheck)
}catch(error){
    console.log(error);
res.status(401).json({error})
}
   
 }


 /* Creating admin */

 const createAdmin=async(req,res)=>{
    const{name,password}=req.body
    try{
const admin=await adminModel.findOne({username:name}).collation( { locale: 'en', strength: 2 } )
if(admin){
    throw new Error("Username already exist")
}if(!admin){
    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)
    const newAdmin=await adminModel.create({username:name,password:hash,isBlocked:false,isActive:false})
    res.status(200).json(newAdmin)
}
    }catch(error){
        console.log(error.message);
        res.status(400).json(error.message)

    }
 }


  
 /* Fetching allAdmin datas */ 

 const allAdmins=async(req,res)=>{
try{
    const admins=await adminModel.find()
    res.status(200).json(admins)
}catch(error){
res.status(400).json(error.message)
}
 

 }
/* 
Admin block/unblock */

 const adminManagement=async(req,res)=>{
const {adminId}=req.body
    try{
        const admincheck=await adminModel.findOne({_id:adminId})
const admin=await adminModel.updateOne({_id:adminId},{isBlocked:!admincheck.isBlocked})

res.status(200).json(admin)
    }catch(error){
res.status(400).json(err.message)
    }
 }

/*  Admin edit */
 const updateAdmin=async(req,res)=>{
    const {id,name,password}=req.body
        try{
            if(password){
                const salt=await bcrypt.genSalt(10)
                const hash=await bcrypt.hash(password,salt)
                const Admin=await adminModel.findOne({username:name}).collation( { locale: 'en', strength: 2 } )
                const admin=await adminModel.updateOne({_id:id},{name:name,password:hash})
                return res.status(200).json({message:"name and password changed"})
            }
            if(!password){
                const Admin=await adminModel.findOne({username:name}).collation( { locale: 'en', strength: 2 } )
                if(Admin){
                    throw new Error("name already exist")
                }
                const admin=await adminModel.updateOne({_id:id},{name})
                res.status(200).json({message:"only name updated"})
            }
 
        }catch(error){
         
    res.status(400).json(error.message)
        }
     }

/* Super Admin product verify */
const superAdminProductManagement=async(req,res)=>{
    const {id}=req.body
        try{         
    const products=await product.findOneAndUpdate({_id:id},{isSuperadminverified:true},{new:true})
    res.status(200).json(products)
        }catch(error){
    res.status(400).json(error.message)
        }
     }


/* 
Delete a admin */

const deleteAdmin=async(req,res)=>{
    const adminId=req.params.id
    try{
const admin=await adminModel.deleteOne({_id:adminId})
res.status(200).json({message:"deleted successfully"})
    }catch(error){
res.status(400).json({message:"Unable to delete"})
    }
}


 module.exports={
    superAdminlogin,adminManagement,allAdmins,createAdmin,deleteAdmin,superAdminsignup,updateAdmin,superAdminProductManagement
 }