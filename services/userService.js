const User=require('../models/userModels')
const bcrypt=require("bcryptjs")
const CustomError = require('../utils/customError')

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