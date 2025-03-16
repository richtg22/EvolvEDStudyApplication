import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Groups.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faUser, faUsers, faComments, faCalendar, faCog } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const Groups = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="groups-container">
      {/* Top Navbar */}
      <div className="top-navbar">
        {/* Menu Button (Only for Mobile) */}
        {isMobile && (
          <button className="menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}

        {/* EvolvED Logo - Click to Toggle Sidebar */}
        <h2 className="brand" onClick={() => setIsSidebarOpen(!isSidebarOpen)}><FontAwesomeIcon icon={faGraduationCap} /> EvolvED</h2>
        
        {/* Logout Button (Correctly Aligned) */}
        <div className="logout-container">
          <Button variant="outline-dark" className="logout-btn">Logout</Button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <ul>
          <li><Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
          <li><Link to="/profile"><FontAwesomeIcon icon={faUser} /> Profile</Link></li>
          <li className="active"><Link to="/groups"><FontAwesomeIcon icon={faUsers} /> Groups</Link></li>
          <li><Link to="/discussions"><FontAwesomeIcon icon={faComments} /> Discussion</Link></li>
          <li><Link to="/meetings"><FontAwesomeIcon icon={faCalendar} /> Meetings</Link></li>
          <li><Link to="/settings"><FontAwesomeIcon icon={faCog} /> Settings</Link></li>
        </ul>
      </div>

      {/* Overlay to close sidebar when clicking outside (for mobile) */}
      {isMobile && isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Main Content */}
      <div className="main-content">
        <h2 className="text-center">Groups</h2>
        <div className="group-image">
          <img src="/images/groups.png" alt="Groups Icon" />
        </div>

        <div className="group-actions">
          <div className="group-card">
            <h5>Create a Group</h5>
            <Button variant="outline-dark">Create</Button>
          </div>
          <div className="group-card">
            <h5>Find a Group</h5>
            <Button variant="outline-dark">Join</Button>
          </div>
          <div className="group-card">
            <h5>View All Groups</h5>
            <Button variant="outline-dark">View</Button>
          </div>
        </div>

        <footer className="footer">
          <p>Copyright © 2025</p>
        </footer>
      </div>
    </div>
  );
};

export default Groups;
