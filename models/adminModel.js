const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const Schema=mongoose.Schema

const adminSchema=new Schema({
    username:{
        type:String,
        required:true
    },password:{
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


adminSchema.statics.login=async function(username,password){
    const admin=await this.findOne({username:username})
    if(admin){
      
      const passwordCheck=await bcrypt.compare(password,admin.password)
      if(!passwordCheck){
        throw new Error("Password is incorrect")
       }else{
        return admin
       }

    }else{
        throw new Error("Invalid credentials")
    }
    }

module.exports=mongoose.model("admin",adminSchema)



