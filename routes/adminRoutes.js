const express=require("express")
const router=express.Router()

const {Adminlogin,adminUserManagement,allAdminusers,createAdminuser,adminProductManagement}=require("../controllers/adminControllers")


router.post("/login",Adminlogin)

router.get("/adminusers",allAdminusers)

router.patch("/adminuser/edit/",adminUserManagement)
router.post("/createadminuser",createAdminuser)

router.patch("/product",adminProductManagement)

module.exports=router