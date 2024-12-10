const express=require('express')
const connectDB = require('./config/db')
const app=express()
require('dotenv').config()

connectDB()
const PORT=process.env.PORT || 5001

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})