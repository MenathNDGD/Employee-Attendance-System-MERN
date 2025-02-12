import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { TbListDetails } from "react-icons/tb";
import { IoLogInOutline } from "react-icons/io5";
import { HiOutlineUserAdd } from "react-icons/hi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

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
                  <div className="nav-item">
                    <TbListDetails className="nav-icn" /> Overview
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/admin"}>
                  <div className="nav-item">
                    <MdOutlineAdminPanelSettings className="nav-icn" /> Admin
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/login"}>
                  <div className="nav-item">
                    <IoLogInOutline className="nav-icn" /> Login
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/register"}>
                  <div className="nav-item">
                    <HiOutlineUserAdd className="nav-icn" /> Register
                  </div>
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
