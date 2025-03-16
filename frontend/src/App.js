import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import HomePage from './Home';
import Profile from './Profile';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">EvolvED Study</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more routes as needed */}
        </Routes>

        <footer className="bg-dark text-white py-4">
          <Container className="text-center">
            <p>© 2023 EvolvED Study. All rights reserved.</p>
            <div>
              <Button variant="link" className="text-white">Terms of Service</Button>
              <Button variant="link" className="text-white">Privacy Policy</Button>
              <Button variant="link" className="text-white">Contact Us</Button>
            </div>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;