const express=require('express')
const router=express.Router()
const User=require('./../models/candidate')
const {jwtauthMiddleware}=require('./../jwt')
const candidate = require('./../models/candidate')

const checkadminrole=async(userID)=>{
    try{
        const user=await User.findById(userID)
        return user.role==='admin'
    }catch(err){
        return false
    }
}

router.post('/',jwtauthMiddleware,async(req,res)=>{
    try{
        if(!checkadminrole(req.user.id))
            return res.status(403).json({message:'You are not admin'})

        const data=req.body
        const newcandidate=new candidate(data)
        const response =await candidate.save()
        console.log("candidate saved")
        res.status(201).json({response:response})
        }
        catch(err)
    {
        console.log(err)
        res.status(500).json({err})
    }
})



router.put('/:candidateID',jwtauthMiddleware,async(req,res)=>{
    try{
        if(!checkadminrole(req.user.id))
            return res.status(403).json({message:'You are not admin'})
        const candidateID=req.params.candidateID
        const updatedcandidate=req.body
        const response =await candidate.findByIdAndUpdate(candidateID,updatedcandidate,{new:true,runValidators:true})
     console.log("cand updated")
     res.status(200).json(response)
    }catch(err){
    console.log(err)
}
})

router.delete('/:candidateID',jwtauthMiddleware,async(req,res)=>{
    try{
        if(!checkadminrole(req.user.id))
            return res.status(403).json({message:'You are not admin'})
        const candidateID=req.params.candidateID
        
        const response =await candidate.findByIdAndDelete(candidateID)
     console.log("cand dele")
     res.status(200).json(response)
    }catch(err){
    console.log(err)
}
})

module.exports=router
