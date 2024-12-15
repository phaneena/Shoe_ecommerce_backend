const express=require('express')
const authenticate = require('../middlewares/authMiddleware')
const { addOrder, showOrders } = require('../controllers/orderController')
const router=express.Router()

router.post('/addOrder',authenticate,addOrder)
router.get('/showOrder',authenticate,showOrders)

module.exports=router