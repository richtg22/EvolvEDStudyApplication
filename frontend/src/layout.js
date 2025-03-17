import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUsers, faComments, faCalendar, faCog, faBars } from '@fortawesome/free-solid-svg-icons';
import "./Layout.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSidebarOpen(window.innerWidth > 768); // Open sidebar on large screens, closed on mobile.
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="layout-container">
      {/* 🔹 Top Navbar */}
      <div className="top-navbar">
        <button className="menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h2 className="brand">
          <FontAwesomeIcon icon={faUsers} /> EvolvED
        </h2>
        <Button variant="outline-dark" className="logout-btn">Logout</Button>
      </div>

      {/* 🔹 Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <ul>
          <li><Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
          <li><Link to="/profile"><FontAwesomeIcon icon={faUser} /> Profile</Link></li>
          <li><Link to="/groups"><FontAwesomeIcon icon={faUsers} /> Groups</Link></li>
          <li><Link to="/discussions"><FontAwesomeIcon icon={faComments} /> Discussion</Link></li>
          <li><Link to="/meetings"><FontAwesomeIcon icon={faCalendar} /> Meetings</Link></li>
          <li><Link to="/settings"><FontAwesomeIcon icon={faCog} /> Settings</Link></li>
        </ul>
      </div>

      {/* 🔹 Main Content (Wrapped Component) */}
      <div className="main-content">
        {children}
      </div>

      {/* 🔹 Footer */}
      <div className="footer">
        <p>Copyright © 2025</p>
      </div>
    </div>
  );
};

export default Layout;
