import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import Button from "./Button";

const Navbar = ({ showLoginButtons }) =>{
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/healthiest/home" className="nav-logo">
            <div style={{ fontWeight: 'bold', fontSize: '2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', fontFamily: 'Poppins', color: '#2d3748' }}>
                <span style={{ fontSize: '3rem', color: '#4f46e5', marginRight: '0.25rem', paddingTop: '0.5rem' }}>
                    <ion-icon name="logo-ionic"></ion-icon>
                </span>
                Healthiest
            </div>

          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </NavLink>
            </li>
            <li>
            {showLoginButtons && (
                <NavLink exact to='/healthiest/home/Patient/Login'>
                  <Button>Login/Sign Up</Button>
                </NavLink>
              )}
              
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

            { click ? (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
