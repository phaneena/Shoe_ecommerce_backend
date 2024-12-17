const express=require('express')

const router=express.Router()
const {registerUser,loginUser, refreshToken}=require('../controllers/userController')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/refreshtoken',refreshToken)

module.exports=router