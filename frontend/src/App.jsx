import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import { getNotes } from "./services/noteService";


function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes from backend
  const fetchNotes = () => {
    getNotes()
      .then(res => setNotes(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
    <Routes>
      <Route path="/home" element={<HomePage notes={notes} fetchNotes={fetchNotes}/>}/>
      <Route path="/create" element={<CreatePage fetchNotes={fetchNotes}/>}/>
      <Route path="/edit/:id" element={<NoteDetailPage fetchNotes={fetchNotes}/>}/>
      <Route path="/register" element={<SignUpPage/>}/>
      <Route path="/" element={<SignInPage/>}/>
    </Routes>
    </>
  )
}

export default App
