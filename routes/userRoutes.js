const express=require("express")
const router=express.Router()
const {userRegistration,userLogin,addtoCart}=require("../controllers/userController")

router.post("/register",userRegistration)

router.post("/login",userLogin)

router.post("/addtocart",addtoCart)

module.exports=router