const jwt=require("jsonwebtoken")
const userModel=require("../models/usersModel")
const bcrypt=require("bcrypt")
const cart=require("../models/cartModel")
 /* Creating jwt token */ 

const createToken=async(id)=>{
    return jwt.sign({id},process.env.PRIVATEKEY,{expiresIn:"1d"})
    }

 /* User Login */

 const userLogin=async(req,res)=>{
    const {email,password}=req.body
try{
    const user=await userModel.login(email,password)
    
    const token=await createToken(user._id)
   
    res.status(200).json(token)
}catch(error){
res.status(401).json(error.message)
}
   
 }

 /* User Registartion*/

 const userRegistration=async(req,res)=>{
    const{name,email,password}=req.body
    try{
        const user=await userModel.signup(name,email,password)
res.status(200).json({message:"Signup Successfull"})
    }catch(error){
        console.log(error.message)
        res.status(400).json(error.message)

    }
 }

const addtoCart=async(req,res)=>{
 
    const {proId}=req.body
    try{
        const response=await cart.create({proId:proId})
        res.status(200).json({message:"Added to cart"})
    }catch(error){
res.status(400).json(error.message)
    }

}





 module.exports={
    userRegistration,userLogin,addtoCart
 }