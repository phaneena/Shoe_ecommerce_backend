const express=require('express')
const app=express()
const dotenv=require('dotenv').config()


const PORT=process.env.PORT || 5001

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})