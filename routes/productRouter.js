const express=require('express')
const { getallProducts } = require('../controllers/productController')
const router=express.Router()


router.get('/products',getallProducts)//getallproduct

module.exports=router