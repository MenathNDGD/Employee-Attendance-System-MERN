import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header>
      <div className="container">
        <div className="menus">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" />
          </Link>
          <nav>
            <ul className={isOpen ? "display" : ""}>
              <div className="btn" onClick={() => setIsOpen(false)}>
                <i className="fas fa-times close-btn"></i>
              </div>
              <li>
                <NavLink to={"/"}>
                  <i className="fas fa-tachometer-alt nav-icn"></i> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to={"/login"}>
                  <i className="fas fa-sign-in-alt nav-icn"></i> Login
                </NavLink>
              </li>
              <li>
                <NavLink to={"/register"}>
                  <i className="fas fa-user-plus nav-icn"></i> Register
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="btn" onClick={() => setIsOpen(true)}>
            <i className="fas fa-bars menu-btn"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
