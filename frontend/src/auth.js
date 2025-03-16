// Authentication utility functions

// Store the authentication token in localStorage
export const setAuthToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  
  // Get the authentication token from localStorage
  export const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };
  
  // Remove the authentication token from localStorage
  export const removeAuthToken = () => {
    localStorage.removeItem('authToken');
  };
  
  // Check if the user is authenticated
  export const isAuthenticated = () => {
    return !!getAuthToken();
  };
  
  // Get authentication headers for API requests
  export const getAuthHeaders = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };