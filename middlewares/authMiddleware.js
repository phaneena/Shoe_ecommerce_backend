const User = require("../models/userModels")
const CustomError = require("../utils/customError")
const { verifyToken } = require("../utils/jwt")

const authenticate=async(req,res,next)=>{
    try{
        const token=req.cookies.accessToken
        if(!token){
            throw new CustomError("Access token is missing",401)
        }
        const decoded=verifyToken(token,process.env.JWT_SECRET)
        if(!decoded){
            throw new CustomError("Invalid or expired refresh token",403)
        }
        const user=await User.findById(decoded.id)
        if(!user){
            throw new CustomError('User not found',404)
        }
        req.user=user
        next(user)
    }
    catch(error){
        next(error)
    }
}
module.exports=authenticate