import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Modal, Alert } from "react-bootstrap";
import "./Meetings.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUsers, faComments, faCalendar, faCog, faSearch, faFileAlt, faBullhorn, faGraduationCap, faBars, faPlus, faClock, faCheckCircle, faRedo } from '@fortawesome/free-solid-svg-icons';

const Meetings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showModal, setShowModal] = useState(false);
  const [meetingData, setMeetingData] = useState({ topic: "", date: "", startTime: "", endTime: "", status: "Pending" });

  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  // Load meetings from local storage
  const [meetings, setMeetings] = useState(() => {
    const savedMeetings = localStorage.getItem("meetings");
    return savedMeetings ? JSON.parse(savedMeetings) : [];
  });

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

  // Save meetings to local storage whenever it updates
  useEffect(() => {
    localStorage.setItem("meetings", JSON.stringify(meetings));
  }, [meetings]);

  const handleChange = (e) => {
    setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!meetingData.topic || !meetingData.date || !meetingData.startTime || !meetingData.endTime) {
      setErrorMessage("⚠️ Please enter all required details before saving the meeting!");
      return;
    }
    
    setMeetings([...meetings, meetingData]);
    setShowModal(false);
    setErrorMessage(""); // Clear the error message
    setMeetingData({ topic: "", date: "", startTime: "", endTime: "", status: "Pending" });
  };

  // Handle Reoccurring Meetings
  const handleReoccur = (meeting) => {
    setMeetingData({
      topic: meeting.topic,  // Keep same topic
      date: "",              // New date input required
      startTime: "",
      endTime: "",
      status: "Pending",
    });
    setShowModal(true);
  };

  return (
    <div className="meetings-container">
      {/* Top Navbar */}
      <div className="top-navbar">
        <button className="menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h2 className="brand" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FontAwesomeIcon icon={faGraduationCap} /> EvolvED
        </h2>
        <Button variant="outline-dark" className="logout-btn">Logout</Button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <ul>
          <li><Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
          <li><Link to="/profile"><FontAwesomeIcon icon={faUser} /> Profile</Link></li>
          <li><Link to="/groups"><FontAwesomeIcon icon={faUsers} /> Groups</Link></li>
          <li><Link to="/discussions"><FontAwesomeIcon icon={faComments} /> Discussion</Link></li>
          <li className="active"><Link to="/meetings"><FontAwesomeIcon icon={faCalendar} /> Meetings</Link></li>
          <li><Link to="/settings"><FontAwesomeIcon icon={faCog} /> Settings</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Container>
          {/* Search Bar */}
          <Form className="search-bar">
            <input type="text" placeholder="Search meetings" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Button><FontAwesomeIcon icon={faSearch} /></Button>
          </Form>

          {/* Meeting Image */}
          <div className="meeting-image-container">
            <img src={require("../meeting.jpg")} alt="Meeting" className="meeting-image" />
          </div>

          {/* Schedule Meeting Button */}
          <Button className="schedule-btn" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faPlus} /> Schedule New Meeting
          </Button>

          {/* Meeting Scheduling Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Schedule a Meeting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} {/* Show error message */}
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Meeting Topic</Form.Label>
                  <Form.Control type="text" name="topic" value={meetingData.topic} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" name="date" value={meetingData.date} onChange={handleChange} required />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Start Time</Form.Label>
                      <Form.Control type="time" name="startTime" value={meetingData.startTime} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>End Time</Form.Label>
                      <Form.Control type="time" name="endTime" value={meetingData.endTime} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={meetingData.status} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="success" onClick={handleSubmit}>Save Meeting</Button>
            </Modal.Footer>
          </Modal>

          {/* Upcoming Meetings */}
          <div className="upcoming-meetings">
            <h3>Upcoming Meetings</h3>
            <Row>
              {meetings.length > 0 ? (
                meetings.map((meeting, index) => (
                  <Col md={4} key={index}>
                    <div className="meeting-card">
                      <h5>{meeting.topic}</h5>
                      <p><FontAwesomeIcon icon={faClock} /> <strong>Date:</strong> {meeting.date}</p>
                      <p><strong>Time:</strong> {meeting.startTime} - {meeting.endTime}</p>
                      <p><FontAwesomeIcon icon={faCheckCircle} /> <strong>Status:</strong> <span className={meeting.status === "Confirmed" ? "confirmed" : "pending"}>{meeting.status}</span></p>
                      <Button className="reoccur-btn" onClick={() => handleReoccur(meeting)}>
                        <FontAwesomeIcon icon={faRedo} /> Reoccur
                      </Button>
                    </div>
                  </Col>
                ))
              ) : (
                <p>No upcoming meetings.</p>
              )}
            </Row>
          </div>
        </Container>
      </div>

      {/* Footer */}
      <div className="footer">Copyright © 2025</div>
    </div>
  );
};

export default Meetings;
