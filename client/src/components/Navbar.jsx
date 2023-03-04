import React, { useContext } from "react";
import Logo from "../assets/blog.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt=""></img>
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?category=art">
            Art
          </Link>
          <Link className="link" to="/?category=science">
            Science
          </Link>
          <Link className="link" to="/?category=technology">
            Technology
          </Link>
          <Link className="link" to="/?category=Cinema">
            Cinema
          </Link>
          <Link className="link" to="/?category=Design">
            Design
          </Link>
          <Link className="link" to="/?category=Food">
            Food
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <Link onClick={logout} to="/" className="link">
              Logout
            </Link>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link to="/write" className="link">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
