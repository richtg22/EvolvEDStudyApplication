import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Groups from "./pages/Groups";
import Discussions from "./pages/Discussions";
import Meetings from "./pages/Meetings";
import Profile from "./pages/Profile"; // Import Profile Page

function App() {
  // State to store API message
  const [message, setMessage] = useState("Loading...");

  // Fetch data from Django backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/test/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Failed to Connect to API"));
  }, []);

  return (
    <Router>
      <div>
        {/* API Response Message */}
        <h1>React & Django Integration Test</h1>
        <p>{message}</p>

        {/* Routes Configuration */}
        <Routes>
          {/* Redirect "/" to "/groups" */}
          <Route path="/" element={<Navigate to="/groups" />} />

          {/* Pages */}
          <Route path="/groups" element={<Groups />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/profile" element={<Profile />} />

          {/* Redirect unknown routes to "/groups" */}
          <Route path="*" element={<Navigate to="/groups" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
