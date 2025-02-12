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
                <NavLink to={"/"}>Dashboard</NavLink>
              </li>
              <li>
                <NavLink to={"/login"}>Login</NavLink>
              </li>
              <li>
                <NavLink to={"/register"}>Register</NavLink>
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
