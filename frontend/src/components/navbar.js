import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { UseAuthContext } from "../hooks/useAuthContext"
const Navbar=()=>{
    const {logout}=useLogout()
    const handleClick=()=>{
        logout()
    }
    const {user}=UseAuthContext()

    return <header>
        <div className="container">
        <Link to="/">
           <h1> workouts </h1>
           </Link> 
           </div>
           <nav>
            {user && (<div>
                <span>{user.username}</span>
                <button onClick={handleClick}>logout</button>
            </div>)}
            {!user && (<div>
                <Link to="/login" style={{margin:10}}>login</Link>
                <Link to="/signup" style={{margin:10}}>signup</Link>
            </div>)}
           </nav>
        </header>
    
}
export default Navbar;