// api.js
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const globalConfig = {
  baseURL: 'https://fis-buyer-staging.ondc.org/api', // Replace with your API's base URL
  timeout: 5000, // Adjust the timeout as needed
  headers: {
    'Content-Type': 'application/json',
    // You can add other headers here if needed
  },
};

const axiosInstance = axios.create(globalConfig);

// Add a response interceptor to handle HTTP errors

axios.interceptors.request.use(
  (config) => {
   
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axios.interceptors.response.use(
  (response) => {
    
    return response;
  },
  (error) => {

    if (error.response.status !== 200) {
      toast.error(`Bad Request ${error.response.status}: Your request is invalid.`);

    } else {
      toast.error("An error occurred.");
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
