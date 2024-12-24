const asyncHandler = require("../utils/asyncHandler");
const STATUS= require("../utils/constants");
const {productService,addProductService,deleteProductService,updateProductService,singleProductService}=require('../services/productService');
const CustomError = require("../utils/customError");


// get all products
exports.getallProducts=asyncHandler(async(req,res)=>{
    const {search,categories,page}=req.query
    const {product,pagination}=await productService({
        search,
        categories,
        page:parseInt(page,10) ||1,
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


//add Products
exports.addProducts=asyncHandler(async(req,res)=>{
    const {name,...rest}=req.body
    const data=await addProductService({name,...rest})
    res.status(201).json({status:STATUS.SUCCESS,message:'Add Product successfully',data})
})


//delete Product
exports.deleteProduct=asyncHandler(async(req,res)=>{
    const {productId}=req.params
    const Products=await deleteProductService(productId)
    res.json({status:STATUS.SUCCESS,message:'Deleted Product Succesfully',Products})
})

//update Product
exports.updateProduct=asyncHandler(async(req,res)=>{
    const {_id,...updateItems}=req.body
    if(!_id){
        throw new CustomError('Product is not found')
    }
    const updateProduct=await updateProductService(_id,updateItems)
    res.status(200).json({status:STATUS.SUCCESS,message:'Product updated successfully',updateProduct})
})

//get single product
exports.singleProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const product=await singleProductService(id)
    res.status(200).json({status:STATUS.SUCCESS,product})
})