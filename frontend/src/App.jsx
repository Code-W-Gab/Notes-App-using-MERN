import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import AdminPage from "./pages/AdminPage";
import AdminDetailPage from "./pages/AdminDetailPage";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import { getNotes } from "./services/noteService";
import PrivateRoute from "./components/routes/PrivateRoute";
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
        <PrivateRoute>
          <HomePage notes={notes} fetchNotes={fetchNotes}/>
        </PrivateRoute>
      }/>
      <Route path="/create" element={
        <PrivateRoute>
          <CreatePage fetchNotes={fetchNotes}/>
        </PrivateRoute>
      }/>
      <Route path="/edit/:id" element={
        <PrivateRoute>
          <NoteDetailPage fetchNotes={fetchNotes}/>
        </PrivateRoute>
      }/>
      <Route path="/admin" element={
        <PrivateRoute>
          <AdminPage user={user} fetchUser={fetchUser}/>
        </PrivateRoute>
      }/>
      <Route path="/user/edit/:id" element={
        <PrivateRoute>
          <AdminDetailPage fetchUser={fetchUser}/>
        </PrivateRoute>
      }/>
      <Route path="/register" element={<SignUpPage/>}/>
      <Route path="/" element={<SignInPage fetchNotes={fetchNotes}/>}/>
    </Routes>
    </>
  )
}

export default App
