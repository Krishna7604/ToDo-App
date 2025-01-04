const usermodel=require("../models/UserModel")
const jwt=require("jsonwebtoken")
const CreateToken=(_id)=>{
    return jwt.sign({id:_id},process.env.SECRET,{expiresIn:"3d"})
}
const loginController= async (req,res)=>{
    const {username,password}=req.body
    try{
        const json=await usermodel.login(username,password)
        const token=CreateToken(json._id)
        res.status(200).json({username,token})
    }catch(err){
        res.status(400).json({"error":err.message})
    }
}
const signupController= async (req,res)=>{ 
    const {username,password}=req.body
    try{
    const json= await usermodel.signup(username,password)
    const token=CreateToken(json._id)
    res.status(200).json({username,token})
    }catch(error){
        res.status(400).json({"error":error.message})
    }
}
module.exports={loginController,signupController}