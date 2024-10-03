const express=require('express')
const app=express()
require('dotenv').config()
const db=require('./db')


const bodyparser=require('body-parser')
app.use(bodyparser.json())//req.body
const PORT=process.env.PORT||100

const userRoute=require('./routes/userRoutes')
const candidateRoute=require('./routes/candidateRoute')


app.use('/user',userRoute)
app.use('/candidate',candidateRoute)



app.listen(PORT,()=>{console.log("server listening")})