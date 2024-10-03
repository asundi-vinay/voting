const jwt =require('jsonwebtoken')
require('dotenv').config()
const jwtauthMiddleware=(req,res,next)=>{
    const authorization=req.headers.authorization
    if(!authorization) return res.status(401).json({mssge:"token not found"})
    //extract jwt token from req headers
    const token=req.headers.authorization.split('')[1]
    if(!token)return res.status(401).json({err:"unauth token"})
        try{
    //verify jwt token
    const decoded=jwt.verify(token,process.env.SECRET_KEY)

    //attach user info to req obj
    req.user=decoded
    next()
    }catch(err)
    {
        console.log(err)
        return res.status(401).json({err:"unauthorize"})

    }
}


//func to generate jwt tokn
const generateToken=(userData)=>{
      //generate new jwt token using user data
      return jwt.sign(userData,process.env.SECRET_KEY)

}

module.exports={jwtauthMiddleware,generateToken}