const mongoose=require("mongoose")

const Schema=mongoose.Schema

const productSchema=new Schema({
    productname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },price:{
        type:String,
        required:true
    },discount:{
        type:String,
        required:true
    },gst:{
        type:String,
        required:true
    },isUnlisted:{
        type:Boolean,
        required:true
    },category:{
        type:String,
        required:true
    },isAdminapproved:{
        type:Boolean,
        required:true
    },isSuperadminverified:{
        type:Boolean,
        required:true
    }
})

module.exports=mongoose.model("product",productSchema)