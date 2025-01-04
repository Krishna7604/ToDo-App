import { useEffect } from "react";
import WorkoutDetails from "../components/workoutdetails";
import WorkoutForm from "../components/WorkoutForm";
import { UseWorkoutContext } from "../hooks/WorkoutContexthook";
import { UseAuthContext } from "../hooks/useAuthContext";

const Home=()=>{
    // const [workout,setworkout]=useState(null)
    const {workouts,dispatch} =UseWorkoutContext()
    const {user}=UseAuthContext()
    useEffect(()=>{
        const fetchworkout= async ()=>{
            const response=await fetch("/api/workout",
                {
                    headers:{"Authorization":`bearer ${user.token}`},
                }
            )
            const res=await response.json()
            
            if (response.ok){
                // setworkout(res)
                dispatch({type:'SET_WORKOUTS',payload:res})

            }
            
        }
        if(user){
        fetchworkout()
        }
    },[dispatch,user])
    
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