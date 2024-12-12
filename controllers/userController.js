const user=require('../models/userModels')
const asyncHandler=require('../utils/asyncHandler')
const STATUS = require('../utils/constants')
const {userRegisterServices}=require('../services/userService')

exports.registerUser=asyncHandler(async(req,res)=>{
    const data=req.body
    await userRegisterServices(data)

    res.status(201).json({
        status:STATUS.SUCCESS,
        message:"user registerd successfully"

    })
})


