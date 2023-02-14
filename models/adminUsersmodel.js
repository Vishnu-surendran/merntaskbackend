const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const Schema=mongoose.Schema

const adminUserSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        required:true
    },isActive:{
        type:Boolean,
        required:true
    }
})

adminUserSchema.statics.login=async function(username,password){
    const adminUser=await this.findOne({username:username})
    
    if(adminUser){
      const passwordCheck=await bcrypt.compare(password,adminUser.password)
      if(!passwordCheck){
        throw new Error("Password is incorrect")
       }else{
        return adminUser
       }
    }else{
        throw new Error("Invalid Credentials")
    }
    }

module.exports=mongoose.model("adminUsers",adminUserSchema)


