import { Link } from "react-router-dom";
import Hacker from "../images/hacker.jpg";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
const Navbar = () =>{
    const { currentUser,logout } = useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="container">
            <div className="logo">
                <Link to="/">
                <img src={Hacker} alt=""/>
                </Link>
            </div>
            <div className="links">
                <Link className="homelink"  to="/"><h6>Home</h6></Link>
                <Link className="link" to="/?cat=art"><h5>Art</h5></Link>
                <Link className="link"  to="/?cat=Tech"><h5>Tech</h5></Link>
                <Link className="link"  to="/?cat=sports"><h5>Sports</h5></Link>
                <Link className="link"  to="/?cat=food"><h5>Food</h5></Link>
                <span >{currentUser?.username}</span>
               {currentUser ? <span onClick={logout}>Logout</span> : <Link className="link" to="/login">Login</Link> } 
                <span  className="write">
                    <Link className="link" to="/write">Write</Link>
                </span>
            </div>

            </div>
        
        </div>
    )
}

export default Navbar;