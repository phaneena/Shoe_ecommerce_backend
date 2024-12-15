const express=require('express')
const authenticate = require('../middlewares/authMiddleware')
const { addOrder } = require('../controllers/orderController')
const router=express.Router()

router.post('/addOrder',authenticate,addOrder)

module.exports=router