const isAdmin = require("../middlewares/isAdmin")
const User=require('../models/userModels')
const CustomError = require("../utils/customError")

//get all users
exports.getAllUserService=async(limits, skips)=>{
    const usersList=await User.find({isAdmin:{$ne:true}}).skip(skips).limit(limits)
    // console.log(usersList,'users')
    const totalUsers=await User.countDocuments({isAdmin:{$ne:true}})
    // console.log(totalUsers,'total')
    return {usersList,totalUsers}
}

//get specific user
exports.singleUserService=async(id)=>{
    const users=await User.findById(id)
    if(!users){
        throw new CustomError('user not found',400)
    }
    return users
}

//Block user
exports.userBlockService=async(id)=>{
    const userDetails=await User.findById(id)
    if(!userDetails){
        throw new CustomError('user not found',400)
    }
    else{
        if(userDetails.isBlocked){
            userDetails.isBlocked=false
        }
        else{
            userDetails.isBlocked=true
        }
        userDetails.save()
        return userDetails
    }
}