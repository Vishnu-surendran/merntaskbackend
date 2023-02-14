const express=require("express")
const app=express()
require("dotenv").config()
const mongoose=require("mongoose")
const cors = require('cors');

const superAdminroutes=require("./routes/superAdminroutes")

const adminRoutes=require("./routes/adminRoutes")

const adminUserroutes=require("./routes/adminUserroutes")

const userRoutes=require("./routes/userRoutes")
app.use(cors())

app.use(express.json());



app.use("/api/admin",adminRoutes)

app.use("/api/user",userRoutes)

app.use("/api/superadmin",superAdminroutes)

app.use("/api/adminusers",adminUserroutes)


mongoose.connect(process.env.MONGO_URI).then((res)=>{
    console.log("dbconnected");
    app.listen(process.env.PORT,(()=>{
        console.log(`server is listening on ${process.env.PORT}`);
    }))
    }).catch((error)=>{
    console.log(error.message)
    })
    