import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Modal } from "react-bootstrap";
import "./Discussions.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUsers, faComments, faCalendar, faCog, faSearch, faFileAlt, faBullhorn, faGraduationCap, faBars, faPlus, faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';

const Discussions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showModal, setShowModal] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({ title: "", description: "" });
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Load discussions from localStorage
  const [discussionThreads, setDiscussionThreads] = useState(() => {
    const savedThreads = localStorage.getItem("discussionThreads");
    return savedThreads ? JSON.parse(savedThreads) : [
      { id: "0007225", title: "Metaverse & Virtual Reality", description: "Short description...", fullDescription: "Full discussion details here...", likes: 10, comments: [] },
      { id: "1007225", title: "5G & Wireless Technologies", description: "Short description...", fullDescription: "Full discussion details here...", likes: 8, comments: [] },
      { id: "2007225", title: "Blockchain & Cryptocurrencies", description: "Short description...", fullDescription: "Full discussion details here...", likes: 5, comments: [] }
    ];
  });

  //Save discussions to localStorage when updated
  useEffect(() => {
    localStorage.setItem("discussionThreads", JSON.stringify(discussionThreads));
  }, [discussionThreads]);

  // Start New Discussion 
  const handleCreateDiscussion = () => {
    if (!newDiscussion.title.trim() || !newDiscussion.description.trim()) {
      alert("⚠️ Please enter a title and description for your discussion.");
      return;
    }

    const newThread = {
      id: `D${Math.floor(Math.random() * 100000)}`,
      title: newDiscussion.title,
      description: newDiscussion.description,
      fullDescription: newDiscussion.description,
      likes: 0,
      comments: [],
    };

    setDiscussionThreads((prevThreads) => [...prevThreads, newThread]);
    setNewDiscussion({ title: "", description: "" });
    setShowModal(false);
  };

  // Like a discussion 
  const handleLikeDiscussion = (discussionId) => {
    setDiscussionThreads((prevThreads) => 
      prevThreads.map((thread) =>
        thread.id === discussionId ? { ...thread, likes: thread.likes + 1 } : thread
      )
    );

    setSelectedDiscussion((prevDiscussion) =>
      prevDiscussion && prevDiscussion.id === discussionId
        ? { ...prevDiscussion, likes: prevDiscussion.likes + 1 }
        : prevDiscussion
    );
  };

  // View More Button 
  const handleViewMore = (discussion) => {
    setSelectedDiscussion({ ...discussion });
    setShowDiscussionModal(true);
  };

  // Add Comment - Now Instantly Shows Comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const updatedThreads = discussionThreads.map((thread) =>
      thread.id === selectedDiscussion.id
        ? { ...thread, comments: [...thread.comments, newComment] }
        : thread
    );

    setDiscussionThreads(updatedThreads);
    
    // Update the selected discussion to immediately show new comments
    const updatedDiscussion = updatedThreads.find(thread => thread.id === selectedDiscussion.id);
    setSelectedDiscussion(updatedDiscussion);

    setNewComment("");
  };

  // SEARCH FUNCTION - Filters Discussions
  const filteredDiscussions = discussionThreads.filter((discussion) =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      {/* Top Navbar */}
      <div className="top-navbar">
        {isMobile && (
          <button className="menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}
        <h2 className="brand" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FontAwesomeIcon icon={faGraduationCap} /> EvolvED
        </h2>
        <Button variant="outline-dark" className="logout-btn">Logout</Button>
      </div>

      <div className="content-wrapper">
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <ul>
            <li><Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
            <li><Link to="/profile"><FontAwesomeIcon icon={faUser} /> Profile</Link></li>
            <li><Link to="/groups"><FontAwesomeIcon icon={faUsers} /> Groups</Link></li>
            <li className="active"><Link to="/discussions"><FontAwesomeIcon icon={faComments} /> Discussion</Link></li>
            <li><Link to="/meetings"><FontAwesomeIcon icon={faCalendar} /> Meetings</Link></li>
            <li><Link to="/settings"><FontAwesomeIcon icon={faCog} /> Settings</Link></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <Container>
            {/* Search Bar */}
            <div className="search-bar">
              <Form.Control
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="search-btn"><FontAwesomeIcon icon={faSearch} /></Button>
            </div>
       
          <Button className="start-discussion-btn" onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={faPlus} /> Start New Discussion
          </Button>
  
          <Row>
          <Col md={8}>
  {/*  Show New Discussion Form Modal */}
  <Modal show={showModal} onHide={() => setShowModal(false)} centered>
    <Modal.Header closeButton>
      <Modal.Title>Start New Discussion</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Discussion Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={newDiscussion.title}
            onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={newDiscussion.description}
            onChange={(e) => setNewDiscussion({ ...newDiscussion, description: e.target.value })}
          />
        </Form.Group>
        <Button variant="success" onClick={handleCreateDiscussion}>Add Discussion</Button>
      </Form>
    </Modal.Body>
  </Modal>

  {/* Show Existing & New Discussions Here */}
  {filteredDiscussions.map((discussion) => (
    <Card key={discussion.id} className="discussion-card">
      <Card.Body>
        <Card.Title>{discussion.title}</Card.Title>
        <Card.Text>{discussion.description}</Card.Text>
        <Button variant="primary" onClick={() => handleViewMore(discussion)}>View More</Button>
      </Card.Body>
    </Card>
  ))}
</Col>
<Col md={4}>
  <div className="right-sidebar">
    <div className="discussion-box">
      <h4><FontAwesomeIcon icon={faComments} /> All Discussions</h4>
      <hr />
      <div className="discussion-option">
        <FontAwesomeIcon icon={faFileAlt} /> <b>Overview</b>
      </div>
      <p>📌 Trending topics and key discussions highlighted here.</p>
      <div className="discussion-option">
        <FontAwesomeIcon icon={faBullhorn} /> <b>Announcements</b>
      </div>
      <p>📢 Important updates from tutors and administrators.</p>
    </div>
  </div>
</Col>
</Row>
</Container>
</div>
</div>

      {/* View More Modal */}
      <Modal show={showDiscussionModal} onHide={() => setShowDiscussionModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDiscussion?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedDiscussion?.fullDescription || selectedDiscussion?.description}</p>
          <Button variant="light" onClick={() => handleLikeDiscussion(selectedDiscussion?.id)}>
            <FontAwesomeIcon icon={faThumbsUp} /> {selectedDiscussion?.likes || 0} Likes
          </Button>
          <hr />
          <h5>Comments</h5>
          <Form.Control type="text" placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <Button variant="success" className="mt-2" onClick={handleAddComment}>Add Comment</Button>
          
         
          <div className="comments-section mt-3">
            {selectedDiscussion?.comments?.map((comment, index) => (
              <p key={index}><FontAwesomeIcon icon={faComment} /> {comment}</p>
            ))}
          </div>
        </Modal.Body>
      </Modal>
      <div className="footer">Copyright © 2025</div>
    </div>
  );
};

export default Discussions;
