import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

function Login() {
   const [email,setEmail]=useState("")
      const [password,setPassword]=useState("")
      const {login, error,isLoading} =useLogin()
      const handleSubmit=async (e)=>{
          e.preventDefault()
          await login(email,password)
      }
    return (
      <form className='login' onSubmit={handleSubmit}>
          <h2>Log in</h2>
          <label>Email:</label>
          <input name='email' type='text'value={email} onChange={e=>setEmail(e.target.value)}></input>
          <label>password:</label>
          <input type='password' name="password" value={password} onChange={e=>setPassword(e.target.value)}></input>
          <button disabled={isLoading}>Log in</button>
          {error && <div className='error'>{error}</div>}
      </form>
      
    )
}

export default Login