const mongoose=require('mongoose')
const bcrypt = require('bcrypt')

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    email:{
        type:String,
        
    },
    mobile:{
        type:String
    },
    address:{
        type:String,
        required:true
    },
    aadharnum:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["voter","admin"],
        default:'voter'
    },
    isvoted:{
        type:Boolean,
        default:false
    }

})

userschema.pre('save',async function(next)
{
    const User=this
    if(!User .isModified('password'))return next()
    try{
        const salt =await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(User.password,salt)
        User.password=hashedpassword
        next()
    
    }catch(err){
        console.log(err)
    }
})

userschema.methods.comparepassword=async function(userpassword){
    try{
        const isMatch=await bcrypt.compare(userpassword,this.password)
        return isMatch
    }catch(err){
        console.log(err)
    }
}


const User=mongoose.model('user',userschema)
module.exports=User