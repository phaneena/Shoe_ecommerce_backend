const express=require('express')
const authenticate = require('../middlewares/authMiddleware')
const { addToWishlist, getAllWishlist } = require('../controllers/wishlistController')

const router=express.Router()
router.post('/addWishlist/:productId',authenticate,addToWishlist)
router.get('/getWishlist',authenticate,getAllWishlist)

module.exports=router