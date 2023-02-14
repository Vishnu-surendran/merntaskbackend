const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const Schema=mongoose.Schema

const superAdminSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
/* 
superAdminSchema.statics.Signup=async function(email,password){
    const superAdmin=await this.findOne({email:email})

    if(superAdmin){
        throw new Error("Email already exist")
    }if(!superAdmin){
        const salt=await bcrypt.genSalt(10)
        const hash=await bcrypt.hash(password,salt)
        const superadmin=await this.create({email:email,password:hash})   
        return superadmin
    }
    }
 */
    superAdminSchema.statics.login=async function(email,password){
        const superAdmin=await this.findOne({email:email})
        
        if(superAdmin){
          const passwordCheck=await bcrypt.compare(password,superAdmin.password)
          if(!passwordCheck){
            throw new Error("Password is incorrect")
           }else{
            return superAdmin
           }
    
        }
        }

module.exports=mongoose.model("superAdmin",superAdminSchema)

