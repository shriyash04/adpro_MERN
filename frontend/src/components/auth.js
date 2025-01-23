// src/utils/auth.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define the API base URL
const apiUrl = process.env.REACT_APP_BASE_URL;

// Get Authorization Headers with JWT Token
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Check if the JWT token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split(".")[1]));
  return Date.now() >= payload.exp * 1000;
};

// Handle token expiration
export const checkTokenExpiration = (navigate) => {
  const token = localStorage.getItem("token");
  if (isTokenExpired(token)) {
    localStorage.removeItem("token");
    navigate("/login");  // Redirect to login page if token is expired
  }
};

// Example of making an authenticated request
export const fetchData = (navigate) => {
  axios
    .get(apiUrl + "protected-endpoint", { headers: getAuthHeaders() })
    .then((res) => console.log(res))
    .catch((error) => {
      console.error(error);
      if (error.response.status === 401) {
        checkTokenExpiration(navigate);  // If unauthorized, check token expiration
        navigate("/login");  // Redirect to login page if unauthorized
      }
    });
};
