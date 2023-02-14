const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
const adminModel=require("../models/adminModel")
const adminUsers=require("../models/adminUsersmodel")
const bcrypt=require("bcrypt")
const product=require("../models/productModel")

 /* Creating jwt token */ 

const createToken=async(id)=>{
    return jwt.sign({id},process.env.PRIVATEKEY,{expiresIn:"1d"})
    }

 /* Admin Login */

 const Adminlogin=async(req,res)=>{
    const {name,password}=req.body
try{
    const adminCheck=await adminModel.login(name,password)
    
    const token=await createToken(adminCheck._id)
    res.status(200).json(token)
}catch(error){
res.status(401).json(error.message)
}
   
 }


 /* Creating adminusers */

 const createAdminuser=async(req,res)=>{
    const{name,password}=req.body
    try{
const admin=await adminUsers.findOne({username:name})
if(admin){
    throw new Error("Name already exist")
}if(!admin){
   
    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)
    const newAdmin=await adminUsers.create({username:name,password:hash,isBlocked:false,isActive:false})
    res.status(200).json(newAdmin)
}
    }catch(error){
        console.log(error);
        res.status(400).json(error.message)

    }
 }


  
 /* Fetching all Adminusers datas */ 

 const allAdminusers=async(req,res)=>{
try{
    const allUsers=await adminUsers.find()
    res.status(200).json(allUsers)
}catch(error){
res.status(400).json(error.message)
}
 

 }
/* 
Adminusers block/unblock */

 const adminUserManagement=async(req,res)=>{
    
const {id}=req.body
    try{
        const admincheck=await adminUsers.findOne({_id:id})
        console.log(admincheck);
const admin=await adminUsers.updateOne({_id:id},{isBlocked:!admincheck.isBlocked})
res.status(200).json(admin)
    }catch(error){
res.status(400).json(error.message)
    }
 }

/* Admin product approval */
const adminProductManagement=async(req,res)=>{
    
    const {id}=req.body
        try{         
    const products=await product.findOneAndUpdate({_id:id},{isAdminapproved:true},{new:true})
    res.status(200).json(products)
        }catch(error){
    res.status(400).json(error.message)
        }
     }


/* 
Delete a adminUser */

const deleteAdminuser=async(req,res)=>{
    const adminId=req.params.id
    try{
const user=await adminUsers.findByIdAndDelete({_id:adminId})
if(!user){
    throw new Error("Item does not exist")
}
res.status(200).json({message:"deleted successfully"})
    }catch(error){
res.status(400).json(error.message)
    }
}


 module.exports={
Adminlogin,adminUserManagement,allAdminusers,createAdminuser,adminProductManagement
 }