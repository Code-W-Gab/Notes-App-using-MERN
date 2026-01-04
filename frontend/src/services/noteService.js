import api from "../api/axios.mjs";

// Create a new note
export const createNote = (note, content) => api.post('/notes/create', { note, content })

// Get a single note by Id
export const getNoteById = (id) => api.get(`notes/get/${id}`)

// Get all notes
export const getNotes = () => api.get('notes/get')

// Update a note
export const updateNote = (id, note, content) => api.put(`notes/update/${id}`, { note, content})

// Delete a note
export const deleteNote = (id) => api.delete(`notes/delete/${id}`)