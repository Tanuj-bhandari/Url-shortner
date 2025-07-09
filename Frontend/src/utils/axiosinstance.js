import axios from 'axios'

// Create axios instance with base configuration
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000
})

axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`Response from ${response.config.url}:`, response.status);
        return response;
    },
    (error) => {
        
        if (error.response) {
            // The server responded with a status code outside of 2xx range
            console.error('Response error:', {
                status: error.response.status,
                data: error.response.data,
                url: error.config.url
            });
            
            // You can handle specific status codes here
            switch (error.response.status) {
                case 400:
                    error.customMessage = 'Bad request. Please check your input.';
                    break;
                case 401:
                    error.customMessage = 'Unauthorized. Please log in again.';
                    // You could trigger a logout or redirect to login here
                    break;
                case 403:
                    error.customMessage = 'Forbidden. You do not have permission.';
                    break;
                case 404:
                    error.customMessage = 'Resource not found.';
                    break;
                case 500:
                    error.customMessage = 'Server error. Please try again later.';
                    break;
                default:
                    error.customMessage = `Error: ${error.response.status} - ${error.response.data.message || 'Something went wrong'}`;
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            error.customMessage = 'No response from server. Please check your connection.';
        } else {
            // Something happened in setting up the request
            console.error('Request setup error:', error.message);
            error.customMessage = `Error: ${error.message}`;
        }
        
        
        
        return Promise.reject(error);
    }
);

export default axiosInstance;
