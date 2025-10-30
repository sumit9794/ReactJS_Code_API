import axios from 'axios';

// Axios instance for API requests
const api = axios.create({
  baseURL: 'http://localhost:8000', // Backend URL
  withCredentials: true,           // Ensure credentials (cookies) are sent
});

export default api;
