const express=require("express")
require("dotenv").config()
const mongoose=require("mongoose")

const workoutrouter=require("./routers/workouts")

//create app
const app=express()
//middleware code 
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
    // next is used to call next method ie next goes to get method
})
//using external routes
app.use("/api/workout",workoutrouter)

// give responses for / i.e. root 
//routes
app.get('/',(req,res)=>{
    res.json({mess:"welcome to this application"})
})

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(" data base is connected && listening to port ",process.env.PORT)
    })
}).catch((error)=>{
    console.log(error)
})
