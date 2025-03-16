import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send the login request to your API
      // const response = await axios.post('/api/login', formData);
      
      // Mock successful login
      setTimeout(() => {
        // For demo purposes, let's check a hardcoded credential
        if (formData.email === 'demo@example.com' && formData.password === 'password123') {
          setMessage({
            text: 'Login successful! Redirecting...',
            type: 'success'
          });
          
          // Store user info in localStorage or context
          localStorage.setItem('user', JSON.stringify({
            email: formData.email,
            name: 'Demo User',
            isAuthenticated: true
          }));
          
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        } else {
          setMessage({
            text: 'Invalid email or password',
            type: 'danger'
          });
        }
        setIsSubmitting(false);
      }, 1000); // Simulate API delay
      
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'An error occurred during login',
        type: 'danger'
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Welcome Back!</h2>
                <p className="text-muted">Sign in to continue to EvolvED</p>
              </div>
              
              {message.text && (
                <Alert variant={message.type} className="mb-4">
                  {message.text}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaEnvelope className="me-2" />
                    Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaLock className="me-2" />
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    label="Remember me"
                  />
                </Form.Group>
                
                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={isSubmitting}
                    className="py-2"
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </Button>
                </div>
              </Form>
              
              <div className="text-center mt-4">
                <p>
                  <Link to="/forgot-password" className="text-decoration-none">
                    Forgot Password?
                  </Link>
                </p>
                <p className="mb-0">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-decoration-none fw-bold">
                    Sign Up
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;