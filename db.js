const mongoose=require("mongoose")
require('dotenv').config()
const mongodburl=process.env.MONGO_URL


// const mongodburl=process.env.MOGOURL_LOC
mongoose.connect(mongodburl)

        
const db=mongoose.connection
db.on('connected',()=>{
    console.log("connected to mongodb server")
})
db.on("error",(err)=>{
    console.log("error in connection",err)
})

db.on("disconnected",()=>{
    console.log("mongo db disconnected")
})

// hii

module.exports=db