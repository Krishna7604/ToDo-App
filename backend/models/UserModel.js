const mongoose=require("mongoose")
const validator=require("validator")
const scheme=mongoose.Schema
const bcrypt=require("bcrypt")
const userscheme=new scheme({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    }
})
userscheme.statics.signup=async function (uname,password){
    if( !uname|| !password){
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(uname)){
        throw Error("Email is incorrect")

    }
    if(!validator.isStrongPassword(password)){
        throw Error("password is not strong enough")
    }
    const exists=await this.findOne({username:uname})
    if(exists){
        throw Error("username or email already exists")

    }
    const salt = await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password,salt)

    const res= await this.create({username:uname,password:hash
    })
    return res;
}
userscheme.statics.login=async function(username,password){
    if(!username||!password){
        throw Error("All fields must be filled")
    }
    const res=await this.findOne({username:username})
    console.log(res)
    if(!res){
        throw Error("user not found")
    }
    const match=await bcrypt.compare(password,res.password)
    if(!match){
        throw Error("password is incorrect")
    }
    
    return res;
}
module.exports=mongoose.model("user",userscheme)