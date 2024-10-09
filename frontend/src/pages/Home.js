import { useEffect } from "react";
import WorkoutDetails from "../components/workoutdetails";
import WorkoutForm from "../components/WorkoutForm";
import { UseWorkoutContext } from "../hooks/WorkoutContexthook";

const Home=()=>{
    // const [workout,setworkout]=useState(null)
    const {workouts,dispatch} =UseWorkoutContext()
    useEffect(()=>{
        const fetchworkout= async ()=>{
            const response=await fetch("/api/workout")
            const res=await response.json()
            
            if (response.ok){
                // setworkout(res)
                dispatch({type:'SET_WORKOUTS',payload:res})

            }
            
        }
        fetchworkout()
    },[dispatch])
    
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm/>
            
        </div>
    )
}
export default Home;