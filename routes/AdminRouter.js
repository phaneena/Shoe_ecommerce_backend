const express=require('express')
const router=express.Router()
const isAdmin = require('../middlewares/isAdmin')
const authenticate = require('../middlewares/authMiddleware')
const { addProducts, deleteProduct, updateProduct } = require('../controllers/productController')
const { allUsers, singleUsers, userBlock } = require('../controllers/adminController')


router.post('/addproduct',authenticate ,isAdmin, addProducts)
router.delete('/deleteproduct',authenticate,isAdmin,deleteProduct)
router.put('/updateproduct',authenticate,isAdmin,updateProduct)
router.get('/getusers',authenticate,isAdmin,allUsers)
router.get('/getusers/:id',authenticate,isAdmin,singleUsers)
router.patch('/userBlock/:id',authenticate,isAdmin,userBlock)

module.exports=router