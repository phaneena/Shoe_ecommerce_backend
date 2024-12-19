const mongoose=require('mongoose')
const { passwordValidator } = require('../validation/userValidation')


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        validate:passwordValidator
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    isBlocked:{
        type:Boolean,
        required:true,
        default:false
    }
})
const User=mongoose.model("user",userSchema)

module.exports=User