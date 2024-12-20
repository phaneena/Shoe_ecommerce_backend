const isAdmin = require("../middlewares/isAdmin")
const User=require('../models/userModels')

//get all users
exports.getAllUserService=async(limits, skips)=>{
    // const usersList=await User.find({isAdmin:{$ne:true}}).skip(skip).limit(limit)
    const usersList=await User.find({isAdmin:{$ne:true}}).skip(skips).limit(limits)
    console.log(usersList,'users')
    const totalUsers=await User.countDocuments({isAdmin:{$ne:true}})
    console.log(totalUsers,'total')
    return {usersList,totalUsers}
}

