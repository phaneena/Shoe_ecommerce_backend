const express=require('express')
const connectDB = require('./config/db')
const asyncHandler = require('./middlewares/asyncHandler')
const errorHandler = require('./middlewares/errorHandler')
const app=express()
require('dotenv').config()

errorHandler()
asyncHandler()
connectDB()
const PORT=process.env.PORT || 5001

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})