const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
const adminUsers=require("../models/adminUsersmodel")
const product=require("../models/productModel")

 /* Creating jwt token */ 

const createToken=async(id)=>{
    return jwt.sign({id},process.env.PRIVATEKEY,{expiresIn:"1d"})
    }

 /* Adminuser Login */

 const AdminUserlogin=async(req,res)=>{
    const {name,password}=req.body
try{
    const adminCheck=await adminUsers.login(name,password)
    const token=await createToken(adminCheck._id)
    res.status(200).json(token)
}catch(error){
res.status(401).json(error.message)
}
   
 }


 /* Creating A product */

 const createProduct=async(req,res)=>{
    console.log(req.body);
    const{name,description,price,discount,gst,category}=req.body
    try{
const productExist=await product.findOne({productname:name}).collation( { locale: 'en', strength: 2 } )
if(productExist){
    throw new Error("Product already exist")
}if(!productExist){
const newProduct=await product.create({productname:name,description:description,price:price,discount:discount,gst:gst,category:category,isUnlisted:false,isAdminapproved:false,isSuperadminverified:false})
    res.status(200).json(newProduct)
}
    }catch(error){
        console.log(error);
        res.status(400).json(error.message)

    }
 }


  
 /* Fetching allAdmin datas */ 

 const allProducts=async(req,res)=>{
try{
    const products=await product.find()
    res.status(200).json(products)
}catch(error){
res.status(400).json(error.message)
}
 

 }
/* 
Product list/unlist */

 const productMangement=async(req,res)=>{
const {id}=req.body
    try{
        const productCheck=await product.findOne({_id:id})
const productStatus=await product.updateOne({_id:id},{isUnlisted:!productCheck.isUnlisted})
res.status(200).json(productStatus)
    }catch(error){
res.status(400).json(error.message)
    }
 }
/* 
Delete a product */

const deleteProduct=async(req,res)=>{
    const proId=req.params.id
    try{
const productDelete=await product.deleteOne({_id:proId})
res.status(200).json({message:"deleted successfully"})
    }catch(error){
res.status(400).json({message:"Unable to delete"})
    }
}


 module.exports={
   AdminUserlogin,allProducts,createProduct,deleteProduct,productMangement
 }