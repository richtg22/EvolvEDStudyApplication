import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaUsers, FaComments, FaVideo, FaCog } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <FaUsers className="logo-icon" />
          <span className="logo-text">EvolvED</span>
        </div>
        
        <div className="sidebar-menu">
          <Link to="/dashboard" className="sidebar-item active">
            <FaHome className="sidebar-icon" />
            <span>Home</span>
          </Link>
          <Link to="/profile" className="sidebar-item">
            <FaUser className="sidebar-icon" />
            <span>Profile</span>
          </Link>
          <Link to="/groups" className="sidebar-item">
            <FaUsers className="sidebar-icon" />
            <span>Groups</span>
          </Link>
          <Link to="/discussion" className="sidebar-item">
            <FaComments className="sidebar-icon" />
            <span>Discussion</span>
          </Link>
          <Link to="/meetings" className="sidebar-item">
            <FaVideo className="sidebar-icon" />
            <span>Meetings</span>
          </Link>
          <Link to="/settings" className="sidebar-item">
            <FaCog className="sidebar-icon" />
            <span>Settings</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Groups</h1>
          <Button variant="light" className="logout-btn">Logout</Button>
        </div>

        {/* Content */}
        <Container className="dashboard-content">
          <div className="groups-icon-container">
            <div className="groups-icon">
              <img 
                src="/images/group-icon.png" 
                alt="Groups" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150?text=Groups";
                }}
              />
            </div>
          </div>

          <Row className="group-actions">
            <Col md={4}>
              <Card className="group-card">
                <Card.Body>
                  <Card.Title>Create a Group</Card.Title>
                  <Button variant="secondary" className="action-btn">Create</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="group-card">
                <Card.Body>
                  <Card.Title>Find a Group</Card.Title>
                  <Button variant="secondary" className="action-btn">Join</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="group-card">
                <Card.Body>
                  <Card.Title>View All Groups</Card.Title>
                  <Button variant="secondary" className="action-btn">View</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Footer */}
        <footer className="dashboard-footer">
          <p>Copyright © 2023</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;