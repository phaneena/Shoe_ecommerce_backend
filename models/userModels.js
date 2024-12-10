const mongoose=require('mongoose')

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
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
})
userSchema()