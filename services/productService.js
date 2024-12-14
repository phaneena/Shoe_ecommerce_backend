const products = require("../models/productModel")

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
    // console.log('Query:', query);
    // console.log('Pages:', pages);
    // console.log('Limit:', limit);
    // console.log('Total count:', total);
    // console.log('Products:', product);

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
