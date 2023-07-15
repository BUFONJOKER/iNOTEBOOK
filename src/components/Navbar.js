import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {}, [location]);
  const handleLogOut=()=>{
    localStorage.removeItem('token')
    navigate('login')
  
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
           
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex" role="search">
              <Link className="btn btn-outline-primary m-1" to="login" role="button">
                Log In
              </Link>
              <Link className="btn btn-outline-primary m-1" to="signup" role="button">
                Sign Up
              </Link>
            </form>:<button onClick={handleLogOut} className="btn btn-outline-primary">Log Out</button>}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
