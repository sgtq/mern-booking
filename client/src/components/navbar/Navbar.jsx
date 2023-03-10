import "./navbar.css";
import { NavLink } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
	const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
		<NavLink to="/" style={{color:"inherit", textDecoration: "none"}}>
        	<span className="logo">SauleBooking</span>
		</NavLink>
		{user ? user.name : (
        <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>
		)}
      </div>
    </div>
  )
}

export default Navbar