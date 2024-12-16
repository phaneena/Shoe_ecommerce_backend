const Cart=require('../models/cartModel')
const CustomError = require('../utils/customError')
const Order=require('../models/orderModel')
const products = require('../models/productModel')

exports.addOrderService=async(name,address,paymentMethod,total,userId)=>{
    const cart=await Cart.findOne({user:userId})
    if(!cart ||cart.products.length === 0){
        throw new CustomError('Your cart is empty. Add items before placing an order.')
    }
    const order = new Order({
        user: userId,
        items: [],
        date: new Date(),
        name,             
        address,          
        paymentMethod,    
        total             
    });
    for (let item of cart.products) {
        const product = await products.findById(item.product);
        if (!product) {
          throw new CustomError(`Product with ID "${item.product}" does not exist.`);
        }
    
        if (product.quantity < item.quantity) {
          throw new CustomError(`Insufficient quantity for ${product.name}.`);
        }
        product.quantity -= item.quantity;
        await product.save();
        order.items.push({ productId: item.product, quantity: item.quantity });
      }
      await order.save();
      cart.products = [];
      await cart.save();
}

exports.showOrderService=async(userId)=>{
    const orders = await Order.find({ user: userId }).populate({path:'items.productId', model:'product'}); // Populate product details
    return { orders };
}