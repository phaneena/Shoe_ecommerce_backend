const express=require('express')
const connectDB = require('./config/db')
const userRouter=require('./routes/userRouter')
const errorHandler = require('./middlewares/errorHandler')

const app=express()
require('dotenv').config()

connectDB()
app.use(express.json())

app.use('/api/users',userRouter)

app.use(errorHandler)
const PORT=process.env.PORT || 5001

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})