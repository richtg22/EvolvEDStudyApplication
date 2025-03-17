import { refreshToken } from "../utils/auth";

const fetchDiscussions = async () => {
  let token = localStorage.getItem("access_token"); // Get token

  const response = await fetch("http://127.0.0.1:8000/api/discussions/view/", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (response.status === 401) { // If token expired
    token = await refreshToken(); // Get new token
    if (!token) {
      console.error("Session expired. Please login again.");
      return;
    }

    return fetchDiscussions(); // Retry request
  }

  const data = await response.json();
  console.log("Discussions:", data);
};
