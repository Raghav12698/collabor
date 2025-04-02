// necessary constants
export const API_BASE_URL ="http://localhost:5000/api"
// import.meta.env.NODE_ENV === 'development'
    
    // : "https://collabordraw-server.onrender.com/api";
export const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
    signup: "/auth/signup",
    login: "/auth/login",
    logout: "/auth/logout",
    getuser: "/auth/userdetails"
}