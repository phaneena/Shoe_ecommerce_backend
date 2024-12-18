const express=require('express')
const { getallProducts, addProducts } = require('../controllers/productController')
const router=express.Router()


router.get('/products',getallProducts)//getallproduct
router.post('/addproduct',addProducts)

module.exports=router