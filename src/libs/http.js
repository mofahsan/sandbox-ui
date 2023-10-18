// api.js
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { env } from '../env/env';
const globalConfig = {
  baseURL: env.sandBox, // Replace with your API's base URL
  timeout: 5000, // Adjust the timeout as needed
  headers: {
    'Content-Type': 'application/json',
    // You can add other headers here if needed
  },
};

const axiosInstance = axios.create(globalConfig);

// Add a response interceptor to handle HTTP errors


// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    if (error?.response?.status &&error.response.status !== 200) {
      toast.error(`Bad Request ${error.response.status}: Your request is invalid.`);
    } else {

      toast.error(error.code);
    }
    return []
    // return Promise.reject(error);
  }
);


export default axiosInstance;
