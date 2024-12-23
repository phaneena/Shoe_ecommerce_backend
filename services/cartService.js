const Cart = require("../models/cartModel")
const products = require("../models/productModel")
const CustomError = require("../utils/customError")

//add to cart
exports.AddCartServices=async(productId,userId)=>{
    //find product
    const existingProduct=await products.findById(productId)
    if(!existingProduct){
        throw new CustomError('product is not found',404)
    }

    //create cart of user
    let cart=await Cart.findOne({user:userId})
    if(!cart){
        cart=new Cart({user:userId,products:[]})
    }

    const existingIndex=cart.products.findIndex((item)=>item.product.toString()===productId)
    if(existingIndex>-1){

        const currentQuantity=cart.products[existingIndex].quantity 
        if(currentQuantity+1>existingProduct.quantity){
            throw new CustomError('You cannot add the product to the quantity,stock is empty',400)
        }
        cart.products[existingIndex].quantity+=1
        throw new CustomError('Product already exist in the cart',400) //quantity increased
    }
    else{
        cart.products.push({product:productId,quantity:1})
    }
    await cart.save()

}

//get cart
exports.getCartServices=async(userId)=>{
    const cart=await Cart.findOne({user:userId}).populate('products.product')
    return cart
}

//delete one item in cart

exports.deleteCartServices=async(productId,userId)=>{
    const result = await Cart.updateOne(
        {user:userId},
        {$pull: {products:{product:productId}}}
    );
    // console.log('Update Result:', result);
    if(result.modifiedCount===0){
        throw new CustomError("Cart not found for the user or product not in cart.", 401)
    } 
}

//update quantity
exports.updateCartService=async(productId,quantity,userId)=>{
    if(!productId ||quantity===null){
        throw new CustomError('product id and quantity are required',400)
    }
    const cart=await Cart.findOne({user:userId})
    if(!cart){
        throw new CustomError('cart not found this user')
    }
    const productItem=cart.products.findIndex((item)=>item.product.toString()===productId)
    if(productItem==-1){
        throw new CustomError('product not found in the cart',404)
    }
    const productDetails=await products.findById(productId)
    if(!productDetails){
        throw new CustomError('product not found',404)
    }
    if(quantity>productDetails.quantity){
        throw new CustomError('Insufficient stock for the requested quantity')
    }
    cart.products[productItem].quantity=quantity
    await cart.save()
    return cart
}