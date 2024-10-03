const express=require('express')
const router=express.Router()
const User=require('./../models/user')
const {jwtauthMiddleware,generateToken}=require('./../jwt')



router.post('/signup',async(req,res)=>{
    try{
        const data=req.body
        const newUser=new User(data)
        const response =await newUser.save()
        console.log("user saved")
        const payload={
            id:response.id
            // username:response.username

        }
        console.log(JSON.stringify(payload))
        const token=generateToken(payload)
        console.log("token is:",token)

        res.status(200).json({response:response,token:token})
        
    }catch(err)
    {
        console.log(err)
        res.status(500).json({err})
    }
})



//loginrouter

router.post('/login',async(req,res)=>{
    try{

        //extract username and pass from req body
        const {aadharnum,password}=req.body
        //find the user by aadharnumber
        const user=await User.findOne({aadharnum:aadharnum})

        //if user does not exist or pass nt match, return err
        if(!user|| !(await user.comparepassword(password))){
                  return res.status(401).json({err:"invalid username or password"})
        }

        //generate token
        const payload={
            id:user.id
            // username:User.username
        }
        console.log(JSON.stringify(payload))
        const token=generateToken(payload)
        console.log("token is:",token)
        //return token as response
        res.status(200).json({user:user,token:token})
    }catch(err){
        console.log(err)
        res.status(500).json({err})
    }
})


//profile route
router.get('/profile',jwtauthMiddleware,async(req,res)=>{
    try{
        const userdata=req.user
        const userID=userdata.id
        const user=await User.findById(userID)
        res.status(200).json({user})


    }catch(err){
        console.log(err)
    }
})

router.put('/profile/password',async(req,res)=>{
    try{
        const userID=req.user.id//extract id from token
        const {currentpassword,newpassword}=req.body//extract the curerentpassword and newpassword from body
        //find the user by userid
        const user=await User.findById(userID)
        //if password does nt match
        if(!(await user.comparepassword(currentpassword))){
            return res.status(401).json({err:"invalid current password"})

            //update user passweprd
            user.password=newpassword
            await user.save()
            console.log("updated pass")
            res.status(200).json({mssg:"updated"})


    }
}catch(err){
    console.log(err)
}
})

module.exports=router
