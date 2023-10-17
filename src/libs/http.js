// api.js
import axios from 'axios';

const globalConfig = {
  baseURL: 'http://localhost:4000', // Replace with your API's base URL
  timeout: 5000, // Adjust the timeout as needed
  headers: {
    'Content-Type': 'application/json',
    // You can add other headers here if needed
  },
};

const axiosInstance = axios.create(globalConfig);

// Add a response interceptor to handle HTTP errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific HTTP status codes here
      if (error.response.status === 401) {
        // Unauthorized: Redirect to login page or show a message
      } else if (error.response.status === 404) {
        // Resource not found: Display a "not found" message
      } else {
        // Handle other HTTP errors
        console.error('HTTP Error123:', error.response.status);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Request Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
