const express=require("express")
const router=express.Router()
const {createAdmin,superAdminProductManagement,adminManagement,allAdmins,deleteAdmin,superAdminlogin,superAdminsignup,updateAdmin}=require("../controllers/superAdmincontrollers")


router.post("/login",superAdminlogin)

router.post("/register",superAdminsignup)

router.post("/createadmin",createAdmin)

router.patch("/adminmanage",adminManagement)

router.get("/admins",allAdmins)

router.patch("/admin/edit",updateAdmin)
router.patch("/product",superAdminProductManagement)
router.delete("/admin/delete/:id",deleteAdmin)
module.exports=router