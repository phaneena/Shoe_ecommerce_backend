const asyncHandler = require("../utils/asyncHandler");
const STATUS = require("../utils/constants");
const {addOrderService}=require('../services/orderService')

//add order
exports.addOrder=asyncHandler(async(req,res)=>{
    const userId=req.user._id
    const {name,address,paymentMethod,total}=req.body
    await addOrderService(
        name,address,paymentMethod,total,userId
    )
    res.status(200).json({status:STATUS.SUCCESS,message:"order success"})
})