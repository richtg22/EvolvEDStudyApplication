async function refreshToken() {
  const refresh = localStorage.getItem("refresh_token");  // Get refresh token from storage
  if (!refresh) return null;  

  try {
      const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh }),
      });

      if (response.ok) {
          const data = await response.json();
          localStorage.setItem("access_token", data.access);  // Store new access token
          return data.access;  // Return new token
      } else {
          console.log("Refresh token expired, logging out...");
          logoutUser();
      }
  } catch (error) {
      console.error("Error refreshing token:", error);
  }
}

async function apiRequest(url, options = {}) {
  let token = localStorage.getItem("access_token");

  if (!token) {
      token = await refreshToken();  // Try to refresh if expired
      if (!token) throw new Error("Unauthorized");
  }

  options.headers = {
      ...options.headers,
      "Authorization": `Bearer ${token}`,
  };

  return fetch(url, options);
}

function logoutUser() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";  // Redirect to login page
}

export { refreshToken, apiRequest, logoutUser };

export function getAuthHeaders() {
    const token = localStorage.getItem("access_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}