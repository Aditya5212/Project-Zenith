import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL // replace with your backend server URL
})

export default axiosInstance;