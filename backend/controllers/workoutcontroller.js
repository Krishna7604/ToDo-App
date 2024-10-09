const workoutmodel=require("../models/workoutmodel")
const mongoose=require("mongoose")
//get all workouts
const getall=async (req,res)=>{
    const workouts= await workoutmodel.find({}).sort({createdAt:-1})
    res.status(200).json(workouts)
}

//get a workout
const getASingle=async (req,res)=>{
    const { id }=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error:"no such workout found"})
    }
    const workout= await workoutmodel.findById(id)
    if (!workout){
        return res.status(404).json({error:"no such workout found"})
    }
    res.status(200).json(workout)
}

//post a workout
const createWorkout= async (req,res)=>{
    const {title,reps,load}=req.body
    emptyfield=[]
    if(!title){
        emptyfield.push('title')
    }
    if(!load){
        emptyfield.push('load')
    }
    if(!reps){
        emptyfield.push('reps')
    }
    if(emptyfield.length >0){
        return res.status(400).json({error:"please fill in all the details",emptyfield})
    }
    try{
        const workout= await workoutmodel.create({title,reps,load})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//delete a workout

const deleteworkout=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error:"no such workout found"})
    }
    const workout=await workoutmodel.findOneAndDelete({_id:id})
    if(!workout){
        res.status(400).json({error:"no such workout found"})
    }
    res.status(200).json(workout)
}
//update a workout
const updateworkout=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error:"no such workout found"})
    }
    const workout =await workoutmodel.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!workout){
        res.status(400).json({error:"no such workout found"})
    }
    res.status(200).json(workout)

}


module.exports={
    getall,
    getASingle,
    createWorkout,
    deleteworkout,
    updateworkout

}