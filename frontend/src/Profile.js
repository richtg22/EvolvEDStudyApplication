import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
// Removed unused imports

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    bio: '',
    subjects: [],
    profilePicture: null
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(true);
  const [newSubject, setNewSubject] = useState('');

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // For now, we'll use mock data
        // In a real app, you would fetch from your API
        // const response = await axios.get('/api/profile');
        
        // Mock data
        const mockProfile = {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          role: 'Student',
          bio: 'I am a student interested in computer science and mathematics.',
          subjects: ['Mathematics', 'Computer Science', 'Physics'],
          profilePicture: null
        };
        
        setProfile(mockProfile);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setMessage({
          text: 'Failed to load profile data. Please try again later.',
          type: 'danger'
        });
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfile(prev => ({
        ...prev,
        profilePicture: URL.createObjectURL(file)
      }));
    }
  };

  const handleAddSubject = () => {
    if (newSubject.trim() && !profile.subjects.includes(newSubject.trim())) {
      setProfile(prev => ({
        ...prev,
        subjects: [...prev.subjects, newSubject.trim()]
      }));
      setNewSubject('');
    }
  };

  const handleRemoveSubject = (subject) => {
    setProfile(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s !== subject)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, you would send the updated profile to your API
      // await axios.put('/api/profile', profile);
      
      // Mock successful update
      setMessage({
        text: 'Profile updated successfully!',
        type: 'success'
      });
      setIsEditing(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({
        text: 'Failed to update profile. Please try again.',
        type: 'danger'
      });
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }

  return (
    <Container>
      {message.text && (
        <Alert variant={message.type} className="mt-3">
          {message.text}
        </Alert>
      )}
      
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h3>User Profile</h3>
              <Button 
                variant={isEditing ? "secondary" : "primary"} 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col md={4} className="text-center">
                    <div className="position-relative mb-3">
                      <img 
                        src={profile.profilePicture || "https://via.placeholder.com/150"} 
                        alt="Profile" 
                        className="rounded-circle img-thumbnail" 
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                      />
                      {isEditing && (
                        <div className="mt-2">
                          <div className="form-group">
                            <label className="btn btn-sm btn-outline-secondary">
                              Change Photo
                              <input 
                                type="file"
                                accept="image/*"
                                className="d-none"
                                onChange={handleProfilePictureChange}
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className="form-group mb-3">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={profile.email}
                        disabled={true} // Email should not be editable
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Role</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profile.role}
                        disabled={true} // Role should not be editable
                      />
                    </div>
                  </Col>
                </Row>
                
                <div className="form-group mb-3">
                  <label>Bio</label>
                  <textarea
                    className="form-control"
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    rows={4}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="form-group mb-3">
                  <label>Subjects</label>
                  <div className="d-flex flex-wrap mb-2">
                    {profile.subjects.map((subject, index) => (
                      <span 
                        key={index} 
                        className="badge bg-primary me-2 mb-2 p-2"
                      >
                        {subject}
                        {isEditing && (
                          <button
                            type="button"
                            className="btn-close btn-close-white ms-2"
                            style={{ fontSize: '0.5rem' }}
                            onClick={() => handleRemoveSubject(subject)}
                          ></button>
                        )}
                      </span>
                    ))}
                  </div>
                  
                  {isEditing && (
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add a subject"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleAddSubject}
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
                
                {isEditing && (
                  <div className="d-grid gap-2 mt-4">
                    <Button type="submit" variant="success">
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;