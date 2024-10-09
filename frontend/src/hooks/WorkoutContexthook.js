import { useContext } from "react";
import { Workoutcontext } from "../context/workoutcontext";
export const UseWorkoutContext=()=>{
    const context=useContext(Workoutcontext);
    if (!context){
        throw Error("useWorkoutContext must be used in contextprovider")
    }
    return context
}