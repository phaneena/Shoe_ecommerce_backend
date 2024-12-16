const asyncHandler = require("../utils/asyncHandler");
const STATUS = require("../utils/constants");
const {addWishlistService,getWishlistServices}=require('../services/wishlistService')

//add favourite
exports.addToWishlist=asyncHandler(async(req,res)=>{
    const userId=req.user._id
    const {productId}=req.params
    const wishlistProduct=await addWishlistService(userId,productId)
    if(wishlistProduct){
        res.status(200).json({status:STATUS.SUCCESS,message:'add to favourite'})
    }
})

//get all favourite
exports.getAllWishlist=asyncHandler(async(req,res)=>{
    const userId=req.user._id
    const userWishlist=await getWishlistServices(userId)
    if(!userWishlist || userWishlist.wishlist.length===0){
        res.status(200).json({status:STATUS.SUCCESS,message:'empty'})
    }
    else{
        res.status(200).json({status:STATUS.SUCCESS,wishlist:userWishlist.wishlist})
    }
})