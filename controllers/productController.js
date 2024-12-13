const asyncHandler = require("../utils/asyncHandler");
const STATUS= require("../utils/constants");
const {productService}=require('../services/productService')

// get all products
exports.getallProducts=asyncHandler(async(req,res)=>{
    const {search,categories,pages}=req.query
    const {product,pagination}=await productService({
        search,
        categories,
        pages:parseInt(pages,10) ||1,
        limit:10
    })
    if(product.length===0){
        res.status(200).json({
            status:STATUS.SUCCESS,
            message:"no products found"
        })
    }
    else{
        res.status(200).json({
            status:STATUS.SUCCESS,
            product,
            pagination
        })
    }
})