// src/api/axios.js
import axios from 'axios';
import { API_URL } from '../config';
import { getToken, logout } from '../utils/auth';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Istek araya girmesi (request interceptor)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Yanit araya girmesi (response interceptor)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // 401 hatasi - oturum sUresi dolmuS
        if (error.response && error.response.status === 401) {
            logout(); // utils/auth.js'deki logout fonksiyonunu kullan
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;