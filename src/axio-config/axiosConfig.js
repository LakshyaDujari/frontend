import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
});
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        const csrf = localStorage.getItem('session');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        if(csrf){
            config.headers['X-CSRFToken'] = csrf;
        }
        return config
    },
    error =>{
        return Promise.reject(error)
    }
);
export default axiosInstance;