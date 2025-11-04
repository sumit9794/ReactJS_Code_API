import axios from 'axios';

// Axios instance for API requests
const api = axios.create({
  baseURL: 'https://node-api-products-erq0.onrender.com/', // Backend URL
  withCredentials: true,           // Ensure credentials (cookies) are sent
});

export default api;
