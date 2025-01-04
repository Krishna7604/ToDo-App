
import React, { useState } from 'react'
import useSignUp from '../hooks/useSignUp'


function Signup() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const {signup,error,isLoading} =useSignUp()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await signup(email,password)
        
    }
  return (
    <form className='signup' onSubmit={handleSubmit}>
        <h2>signup</h2>
        <label>Email:</label>
        <input name='email' type='text'value={email} onChange={e=>setEmail(e.target.value)}></input>
        <label>password:</label>
        <input type='password' name="password" value={password} onChange={e=>setPassword(e.target.value)}></input>
        <button disabled={isLoading}>sign up</button>
        {error && <div className='error'>{error}</div>}
    </form>
    
  )
}

export default Signup