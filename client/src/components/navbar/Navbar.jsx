import { useContext } from "react";
import "./navbar.css"
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const navigate=useNavigate()
  const { user } = useContext(AuthContext);

  
  const handleClick=()=>{
    navigate("/login")
  }
  return (
    <div className="navbar">
        <div className="navContainer">
           <Link to="/" style={{color:"inherit",textDecoration:"none"}}>
            <span className="log">Booking Website</span>
            </Link>
            {user ? (<button className="navButton">{`${user.details.username}`}</button>):(<div className="navItems">
                <button className="navButton"onClick={handleClick}>Register</button>
                <button className="navButton"onClick={handleClick}>Login</button>
            </div>)}
        </div>
    </div>
  )
}

export default Navbar