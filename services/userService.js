const User=require('../models/userModels')
const bcrypt=require("bcryptjs")
const CustomError = require('../utils/customError')
const {generateAccessToken,verifyToken}=require('../utils/jwt')


//service of new user
exports.userRegisterServices=async(data)=>{
    const userExist=await User.findOne({email:data.email})
    if(userExist){
        throw new CustomError("User already exists",400)
    }
    const hashPassword=await bcrypt.hash(data.password,10)
    const newUser = new User({
        name:data.name,
        email:data.email,
        password:hashPassword,
        username:data.username,
    });
    const savedUser=await newUser.save()
    return savedUser._id
}


//service of login user
exports.userLoginServices=async(email,password)=>{
    const userData=await User.findOne({email})
    if(!userData){
        throw new CustomError("Invalid email or Password",401)
    }
    const isMatch=await bcrypt.compare(password,userData.password)
    if(!isMatch){
        throw new CustomError("Invalid Email or Password",401)
    }
    if(userData.isBlock){
        throw new CustomError("Your account is blocked. Please contact Admin.", 403)
    }
    return userData
}

exports.refreshAccessTokenService=async(refreshToken)=>{

    //refresh token exists
    if(!refreshToken){
        throw new CustomError("Refresh token missing",401)
    }
    //verify refresh token
    const decoded=verifyToken(refreshToken,process.env.JWT_REFRESH_SECRET)
    if(!decoded){
        throw new CustomError("Invalid or expired refresh token", 403)
    }
    const user=await User.findById(decoded.id)
    if(!user){
        throw new CustomError("User not found",404)
    }
    const newAccessToken=generateAccessToken(user)
    return {newAccessToken}
}