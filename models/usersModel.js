const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const Schema=mongoose.Schema

const userModel=new Schema({
    name:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

userModel.statics.signup=async function(name,email,password){
    const user=await this.findOne({email:email})
    
    console.log(user,"jk");
    if(user){
        throw new Error("Email already exist")
    }if(!user){
        const salt=await bcrypt.genSalt(10)
        const hash=await bcrypt.hash(password,salt)
        console.log(hash,"'jgs");
        const newUser=await this.create({name:name,email:email,password:hash})   
        return newUser
    }
    }
    
    userModel.statics.login=async function(email,password){
        const user=await this.findOne({email:email})
            if(user){
          const passwordCheck=bcrypt.compare(password,user.password)
          if(!passwordCheck){
            throw new Error("Password is incorrect")
           }else{
            return user
           }
    
        }else{
            throw new Error("User does not exist")
        }
        }


module.exports=mongoose.model("user",userModel)

