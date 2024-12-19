const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");

const isAdmin=asyncHandler(async(req,res,next)=>{
    if(!req.user || !req.user.isAdmin){
        throw new CustomError('Access denied.Admin only ',403)
    }
    console.log(req.user.isAdmin)
    next()
})
module.exports=isAdmin