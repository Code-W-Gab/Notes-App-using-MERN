import api from "../api/axios.mjs";

export const User = () => api.get('/admin/user') 

export const DeleteUser = (id) => api.delete(`admin/delete/${id}`)

export const GetUserById = (id) => api.get(`admin/get/${id}`)

export const UpdateUser = (id, role) => api.put(`admin/update/${id}`, { role })