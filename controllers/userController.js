const asyncHandler=require('../utils/asyncHandler')
const STATUS = require('../utils/constants')
const {userRegisterServices,userLoginServices}=require('../services/userService')
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../utils/jwt')
const User = require('../models/userModels')
// const CustomError=require('../utils/customError')
const {refreshAccessTokenService}=require("../services/userService")

exports.registerUser=asyncHandler(async(req,res)=>{
    const data=req.body
    await userRegisterServices(data)

    res.status(201).json({
        status:STATUS.SUCCESS,
        message:"user registerd successfully"

    })
})

exports.loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const User=await userLoginServices(email,password)

    const accessToken=generateAccessToken(User)
    const refreshToken=generateRefreshToken(User)
    res.cookie("accessToken",accessToken,{httpOnly:true,secure:false,maxAge:15*60*1000})
    .cookie("refreshToken",refreshToken,{httpOnly:true,secure:false,maxAge:7*24*60*60*1000})
    .status(200).
    json({
        status:STATUS.SUCCESS,
        message:"user login successfully"
    })
})

exports.refreshToken=asyncHandler(async(req,res)=>{
    const {refreshToken}=req.cookies;

    const { newAccessToken } = await refreshAccessTokenService(refreshToken)
    res.cookie("accessToken",newAccessToken,{httpOnly:true,secure:false,maxAge:15*60*1000})
    .status(200)
    .json({
        status:STATUS.SUCCESS,
        message:'Access token refereshed'
    })
})