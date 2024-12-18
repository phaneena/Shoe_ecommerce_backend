const products = require("../models/productModel")
const CustomError = require("../utils/customError")

//get product
exports.productService=async({search,categories,pages=1,limit=10})=>{
    const query={isDelete:false}

    //Add search
    if(search){
        query.$or=[
            {name:{$regex:search,$options:'i'}},
            {categories:{$regex:search,$options:'i'}}
        ]
    }

    //Add category
    if(categories){
        query.categories={$regex:`^${categories}$`, $options:'i'}
    }


    //pagination
    const skip=(pages-1)*limit
    const total=await products.countDocuments(query)
    const product=await products.find(query).skip(skip).limit(limit)
    // const product=await products.find()

    return{
        product,
        pagination:{
            total,
            pages,
            limit,
            totalPages:Math.ceil(total/limit)
        }
    }
}

//add new Product
exports.addProductService=async({name,...rest})=>{
    const existingItem=await products.findOne({name})
    if(existingItem){
        throw new CustomError('Product already exists',400)
    }
    const newProduct=new products({name,...rest})
    await newProduct.save()
    return newProduct
}