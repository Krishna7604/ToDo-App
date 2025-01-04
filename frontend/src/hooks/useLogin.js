import { useState } from "react"
import { UseAuthContext } from "./useAuthContext"

export const useLogin=()=>{
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(null)
    const {dispatch}=UseAuthContext()
    const login= async (email,password)=>{
        setError(null)
        setIsLoading(true)
        const response=await fetch("/api/users/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username:email,password})
        })
        
        const json=await response.json();
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem("user",JSON.stringify(json));

            dispatch({type:"LOGIN",payload:json})
            setIsLoading(false)

        }

    }
    return {login,error,isLoading}
}