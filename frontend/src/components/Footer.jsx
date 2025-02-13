import React from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import LogoFooter from "../assets/logo.svg";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="logo-section">
            <img src={LogoFooter} alt="LogoFooter" />
          </div>
          <p className="footer-description">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="/">Overview</a>
            </li>
            <li>
              <a href="/admin">Admin Dashboard</a>
            </li>
            <li>
              <a href="/login">Sign In</a>
            </li>
            <li>
              <a href="/register">Sign Up</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
