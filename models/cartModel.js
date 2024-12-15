const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'user',required:true
    },
    products:[
        {
            product:{type:mongoose.Schema.Types.ObjectId,ref:"product",required:true},
            quantity:{type:Number,required:true}
        }
    ]
})
const Cart=mongoose.model('Cart',cartSchema)

module.exports=Cart