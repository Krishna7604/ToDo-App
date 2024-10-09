import { UseWorkoutContext } from "../hooks/WorkoutContexthook"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
const WorkoutDetails =({workout})=>{
    const {dispatch}=UseWorkoutContext()
    const handleDelete=async ()=>{
        const response=await fetch("/api/workout/"+workout._id,{
            method:'DELETE'
        })
        const json=await response.json()
        if (response.ok){
            dispatch({type:'DELETE_WORKOUT',payload:json})
            
        }

    }
    return (
        <div className="workout-detail">
        <h4>{workout.title}</h4>
        <p><strong>load (kg):</strong>{workout.load}</p>
        <p><strong>count :</strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
        <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>


        </div>


    )
    
}
export default WorkoutDetails