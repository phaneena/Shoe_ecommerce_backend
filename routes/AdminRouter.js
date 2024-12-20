const express=require('express')
const router=express.Router()
const isAdmin = require('../middlewares/isAdmin')
const authenticate = require('../middlewares/authMiddleware')
const { addProducts, deleteProduct } = require('../controllers/productController')
const { allUsers } = require('../controllers/adminController')


router.post('/addproduct',authenticate ,isAdmin, addProducts)
router.delete('/deleteproduct',authenticate,isAdmin,deleteProduct)
router.get('/getusers',authenticate,isAdmin,allUsers)

module.exports=router