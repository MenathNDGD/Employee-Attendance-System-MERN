import React, { useState, useContext } from "react";
import Logo from "../assets/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { TbListDetails } from "react-icons/tb";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { HiOutlineUserAdd } from "react-icons/hi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

              {user && (
                <li>
                  <NavLink to={"/"}>
                    <div className="nav-item">
                      <TbListDetails className="nav-icn" /> Overview
                    </div>
                  </NavLink>
                </li>
              )}

              {user?.role === "admin" && (
                <li>
                  <NavLink to={"/admin"}>
                    <div className="nav-item">
                      <MdOutlineAdminPanelSettings className="nav-icn" /> Admin
                    </div>
                  </NavLink>
                </li>
              )}

              {!user ? (
                <>
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
                </>
              ) : (
                <li>
                  <button className="logout-btn" onClick={handleLogout}>
                    <IoLogOutOutline className="nav-icn" /> Logout
                  </button>
                </li>
              )}
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
