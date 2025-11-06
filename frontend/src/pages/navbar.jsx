import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo"><b>VitalFlow</b></div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/looking">Search</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
