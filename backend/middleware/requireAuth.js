const usermodel=require("../models/UserModel")
const jwt=require("jsonwebtoken")
const requireAuth=async (req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){
        return res.status(401).json({error:"Authorization token is requied"})
    }
    const token=authorization.split(" ")[1]
    try{
        const {id}=jwt.verify(token,process.env.SECRET)
        const val=await usermodel.findOne({_id:id}).select("_id")
        console.log("debug",val)
        req.user=await usermodel.findOne({_id:id}).select('_id')

        next()
    }catch(error){
        console.log(error)
        res.status(401).json({error:"Request is not authorized"})
    }
    


}
module.exports=requireAuth