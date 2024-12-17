const express=require('express')
const authenticate = require('../middlewares/authMiddleware')
const { addToCart, getCart, deleteCart } = require('../controllers/cartController')

const router=express.Router()

router.post('/addToCart/:productId',authenticate,addToCart)
router.get('/getCart',authenticate,getCart)
router.delete('/deleteCart/:productId',authenticate,deleteCart)
module.exports=router