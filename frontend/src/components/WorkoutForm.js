import { useState } from "react"
import { UseWorkoutContext } from "../hooks/WorkoutContexthook"

const WorkoutForm=()=>{
    const { dispatch }=UseWorkoutContext()
    const [title,settitle]=useState('')
    const [reps,setreps]=useState('')
    const [load,setload]=useState('')
    const [error,seterror]=useState(null)
    const [emptyfield,setemptyfield]=useState([])
    const handlesubmit=async (e)=>{
        e.preventDefault()
        const workout={title,reps,load}
        const responce=await fetch('/api/workout',
            {
                method:'POST',
                body:JSON.stringify(workout),
                headers:{"content-type":"application/json"}
            })
        const json=await responce.json()
        if(!responce.ok){
            seterror(json.error)
            setemptyfield(json.emptyfield)
        }
        if (responce.ok){
            seterror(null)
            setload("")
            settitle('')
            setreps('')
            setemptyfield([])
            console.log("new workout is added")
            dispatch({type:'CREATE_WORKOUT',payload:json})

        }


    }

    return (

        <div className="workoutform">
            <form className="form" onSubmit={handlesubmit}>
                <h4>Add new workout</h4>
                <br/>
                <label>Name</label>
                <input type="text"
                onChange={(e)=>{settitle(e.target.value)}}
                value={title}
                className={emptyfield.includes('title')?'err':''}/>
                <br/>
                <label>reps: </label>
                <input type="number"
                onChange={(e)=>{setreps(e.target.value)}}
                value={reps}
                className={emptyfield.includes('reps')?'err':''}/>
                <br/>
                <label>load(kg): </label>
                <input type="number"
                onChange={(e)=>{setload(e.target.value)}}
                value={load}
                className={emptyfield.includes('load')?'err':''}/>
                <br/>
                <button>Add workout</button>
                {error && <div className="error">{error}</div>}
                
            </form>
        </div>
    )
}
export default WorkoutForm