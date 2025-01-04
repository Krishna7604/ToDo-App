import { UseAuthContext } from "./useAuthContext"
import { UseWorkoutContext } from "./WorkoutContexthook"

export const useLogout=()=>{
    const {dispatch}=UseAuthContext()
    const { dispatch : WorkoutDispatch }=UseWorkoutContext()
    const logout=()=>{
        localStorage.removeItem("user")
        dispatch({type:"LOGOUT"})
        WorkoutDispatch({type:"SET_WORKOUTS",payload:null})

    }
    return {logout}
}