import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./backendUrl";

const BASE_URL = BACKEND_URL;

export const axiosinstance = axios.create({
  baseURL: BASE_URL,
});

axiosinstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
    const navigate=useNavigate()
      navigate('/login');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


