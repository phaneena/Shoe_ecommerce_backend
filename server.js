const express=require('express')
const connectDB = require('./config/db')
const userRouter=require('./routes/userRouter')
const errorHandler = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser');
// const cors = require('cors');
const productRouter=require('./routes/productRouter')
const cartRouter=require('./routes/cartRouter')
const orderRouter=require('./routes/orderRouter')
const wishlistRouter=require('./routes/wishlistRouter')
const AdminRouter=require('./routes/AdminRouter')
const app=express()
require('dotenv').config()

connectDB()
app.use(express.json())
app.use(cookieParser());
// app.use(cors());

app.use('/api/users',userRouter)
app.use('/api/users',productRouter)
app.use('/api/users',cartRouter)
app.use('/api/users',orderRouter)
app.use('/api/users',wishlistRouter)
app.use('/api/admin',AdminRouter)

app.use(errorHandler)
const PORT=process.env.PORT || 5001

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})