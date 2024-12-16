const products = require("../models/productModel")
const Favourite = require("../models/wishlistModel")
const CustomError = require("../utils/customError")

exports.addWishlistService=async(userId,productId)=>{
    const existingProduct=await products.findById(productId)
    // console.log(productId)
    // console.log(existingProduct)
    if(!existingProduct){
        throw new CustomError('Product is not found',404)
    } 
    let userFavourite=await Favourite.findOne({user:userId})
    if(!userFavourite){
        userFavourite=new Favourite({user:userId,wishlist:[]})
    }
    console.log(userFavourite)
    const existingFavourite = userFavourite.wishlist.find(
        (item) => item.toString() === productId
    );
    if(existingFavourite){
        throw new CustomError('item already exist in favourite',400)
    }
    userFavourite.wishlist.push(productId)
    await userFavourite.save()
    return userFavourite.wishlist

}
exports.getWishlistServices=async(userId)=>{
    const userFavourite=await Favourite.findOne({user:userId}).populate("wishlist")
    return userFavourite
}