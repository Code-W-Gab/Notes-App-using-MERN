import api from "../api/axios.mjs";

// Login account 
export const Login = (email, password) => api.post('auth/login', { email, password })

// Register account
export const Register = (email, password) => api.post('auth/register', { email, password })
