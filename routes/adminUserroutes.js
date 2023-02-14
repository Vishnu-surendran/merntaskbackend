const express=require("express")
const router=express.Router()

const {AdminUserlogin,allProducts,createProduct,deleteProduct,productMangement}=require("../controllers/adminUsercontroller")



router.post("/login",AdminUserlogin)

router.get("/products",allProducts)

router.post("/createproduct",createProduct)

router.patch("/product/edit",productMangement)

router.delete("/product/delete/:id",deleteProduct)

module.exports=router