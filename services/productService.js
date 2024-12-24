const products = require("../models/productModel")
const CustomError = require("../utils/customError")

//get product
exports.productService=async({search,categories,page=1,limit=10})=>{
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
    const skip=(page-1)*limit
    const total=await products.countDocuments(query)
    const product=await products.find(query).skip(skip).limit(limit)
    // const product=await products.find()

    return{
        product,
        pagination:{
            total,
            page,
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

//delete single product
exports.deleteProductService=async(productId)=>{
    const existingProduct=await products.findById(productId)
    if(!existingProduct){
        throw new CustomError('Product is unavailable',400)
    }
    return await products.findByIdAndUpdate(
        productId,{isDelete:true},{new:true}
    )

}

//update a Product

exports.updateProductService=async(_id,updateItems)=>{
    const existing=await products.findById(_id)
    if(!existing){
        throw new CustomError('product is unavailable',400)
    }
    const data=await products.findByIdAndUpdate({_id,isDelete:false},{ $set:{...updateItems}},{new:true})
    return data
}

//get single product
exports.singleProductService=async(id)=>{
    const existingproduct=await products.findById(id)
    // console.log(existingproduct)
    if(!existingproduct){
        throw new CustomError('product is not available',400)
    }
    return existingproduct
}