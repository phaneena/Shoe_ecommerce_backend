const CustomError = require("../utils/customError")
const { verifyToken } = require("../utils/jwt")

const authenticate=async(req,res,next)=>{
    try{
        const token=req.cookies.accessToken
        if(!token){
            throw new CustomError("Access token is missing",401)
        }
        const decoded=verifyToken(token,process.env.JWT_SECRET)
    }
}