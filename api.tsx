import axios from "axios";


const api = axios.create({
  baseURL: "http://45.138.158.137:92/api/", // Base URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Tokenni saqlangan joydan olish
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;