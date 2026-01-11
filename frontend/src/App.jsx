// User Page
import HomePage from "./pages/user/HomePage"
import CreatePage from "./pages/user/CreatePage"
import NoteDetailPage from "./pages/user/NoteDetailPage";
// Auth Page
import SignUpPage from "./pages/auth/SignUpPage";
import SignInPage from "./pages/auth/SignInPage";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
// Admin Page
import AdminPage from "./pages/admin/AdminPage";
import AdminDetailPage from "./pages/admin/AdminDetailPage";
import AdminNotePage from "./pages/admin/AdminNotePage";
// Common Import
import PrivateRoute from "./components/common/PrivateRoute";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import { getNotes } from "./services/noteService";
import { User } from "./services/adminService" 



function App() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState([])
  
  const fetchUser = () => {
    // Admin Service
    User()
      .then(res => setUser(res.data))
      .catch(err => console.log(err))
  }

  // Fetch notes from backend
  const fetchNotes = () => {
    getNotes()
      .then(res => setNotes(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchNotes();
    fetchUser()
  }, []);

  return (
    <>
    <Routes>
      <Route path="/home" element={
        <PrivateRoute role="user">
          <HomePage notes={notes} fetchNotes={fetchNotes}/>
        </PrivateRoute>
      }/>
      <Route path="/create" element={
        <PrivateRoute role="user">
          <CreatePage fetchNotes={fetchNotes}/>
        </PrivateRoute>
      }/>
      <Route path="/edit/:id" element={
        <PrivateRoute role="user">
          <NoteDetailPage fetchNotes={fetchNotes}/>
        </PrivateRoute>
      }/>
      <Route path="/admin" element={
        <PrivateRoute role="admin">
          <AdminPage user={user} fetchUser={fetchUser}/>
        </PrivateRoute>
      }/>
      <Route path="/user/edit/:id" element={
        <PrivateRoute role="admin">
          <AdminDetailPage fetchUser={fetchUser}/>
        </PrivateRoute>
      }/>
      <Route path="/notes/:id" element={
        <PrivateRoute role="admin">
          <AdminNotePage/>
        </PrivateRoute>
      }/>
      <Route path="/forgot-pass" element={<ForgotPasswordPage/>}/>
      <Route path="/auth/callback" element={<AuthCallbackPage fetchNotes={fetchNotes} />} />
      <Route path="/register" element={<SignUpPage/>}/>
      <Route path="/" element={<SignInPage fetchNotes={fetchNotes}/>}/>
    </Routes>
    </>
  )
}

export default App
