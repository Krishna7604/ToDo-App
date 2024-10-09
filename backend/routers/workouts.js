const express=require("express")
const router=express.Router()
const {
    getall,
    getASingle,
    createWorkout,
    deleteworkout,
    updateworkout
}=require("../controllers/workoutcontroller")


//get all data 
router.get("/",getall)

// get a single

router.get("/:id",getASingle)

// create a new workout
router.post("/",createWorkout)

// delete a workoout
router.delete("/:id",deleteworkout)
// update a workout

router.patch("/:id",updateworkout)
module.exports=router