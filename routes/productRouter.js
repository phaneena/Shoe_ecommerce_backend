const express=require('express')
const { getallProducts, singleProduct} = require('../controllers/productController')

const router=express.Router()


router.get('/products',getallProducts)//getallproduct
router.get('/products/:id',singleProduct) //get single


module.exports=router