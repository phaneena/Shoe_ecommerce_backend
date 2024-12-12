const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    description:{type:Number,required:true},
    categories:{type:Number,required:true},
    images:{type:Number,required:true},
    isDelete:{type:Boolean,required:true,default:false}
})

const product=mongoose.model(productSchema)

module.exports=product