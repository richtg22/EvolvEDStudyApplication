import React, { useEffect, useState } from "react"; // ✅ Import hooks
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/test/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage("Failed to Connect to API"));
  }, []);

  return (
    <div>
      <h1>React & Django Integration Test</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
