const mongoose=require("mongoose")

const Schema=mongoose.Schema

const cartSchema=new Schema({
    proId:{
        type:String,
        required:true
    },


})
module.exports=mongoose.model("cart",cartSchema)