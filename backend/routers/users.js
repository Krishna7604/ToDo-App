const express=require('express')
const model=require("../models/UserModel")
const {loginController,signupController}=require("../controllers/UserController")
const userrouter=express.Router()
userrouter.post('/login',loginController)
userrouter.post ('/signup',signupController)
module.exports={
    userrouter
}