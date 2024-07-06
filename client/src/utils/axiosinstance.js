import axios from "axios";

const BASE_URL = 'http://localhost:3000';

export const axiosinstance = axios.create({
  baseURL: BASE_URL,
});

axiosinstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

