const asyncHandler = require("../utils/asyncHandler");
const STATUS = require("../utils/constants");
const {AddCartServices,getCartServices,deleteCartServices,updateCartService}=require('../services/cartService')

// add to cart
exports.addToCart=asyncHandler(async(req,res)=>{
    const {productId}=req.params
    const userId=req.user._id
    await AddCartServices(productId,userId)
    res.json({status:STATUS.SUCCESS,message:'add product successfully'})
})


//get all items in cart
exports.getCart=asyncHandler(async(req,res)=>{
    const userId=req.user._id
    const cart=await getCartServices(userId)
    if(cart.products.length===0){
        res.status(200).json({status:STATUS.SUCCESS,message:'your cart is empty'})
    }
    else{
        res.status(200).json({status:STATUS.SUCCESS,message:'cart list...',cart})
    }
})

//delete item in cart
exports.deleteCart=asyncHandler(async(req,res)=>{
    const {productId}=req.params
    const userId=req.user._id
    await deleteCartServices(productId,userId)
    res.json({status:STATUS.SUCCESS,message:'delete cart success'})
})

//update quantity
exports.updateQuantityCart=asyncHandler(async(req,res)=>{
    const {productId,quantity}=req.body
    const userId=req.user._id
    const updateCart=await updateCartService(productId,quantity,userId)
    res.status(200).json({status:STATUS.SUCCESS,message:'update cart successfully',cart:updateCart.products})
})