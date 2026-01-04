import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createNote } from "../../services/noteService"
import toast from 'react-hot-toast'

export default function Form({ fetchNotes }) {
  const [note, setNote] = useState("")
  const [content, setContent] = useState("")
  const navigate = useNavigate()

  const handleCreateNote = (e) => {
    e.preventDefault() // Prevent default form action
    if (!note.trim() || !content.trim()) {
      toast.error("Title and Content cannot be empty.")
      return
    }
    
    // Services
    createNote(note, content)
      .then(res => {
        setNote("")
        setContent("")
        toast.success("Successfully Created!")
        navigate('/home')
        fetchNotes()
        console.log(res)
      })
      .catch(err => console.log(err))
  }
  
  return(
    <div className="flex justify-center p-6">
      <div className="w-full max-w-xl text-white rounded">
        <nav className="flex gap-2 items-center mb-10">
          <Link to="/home">
            <ArrowLeft size={20}/>
          </Link>
          <span>Back to notes</span>
        </nav>
        <div className="bg-[#141212] p-5 rounded-xl">
          <h1 className="text-xl mb-5 font-bold">Create New Note</h1>
          <div className="flex flex-col mb-3 gap-1">
            <label htmlFor="note-title">Title</label>
            <input 
              id="note-title"
              className="border border-white rounded-sm px-3 py-1.5"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Note Title" 
            />
          </div>
          <div className="flex flex-col mb-5 gap-1">
            <label htmlFor="note-content">Content</label>
            <textarea
              id="note-content"
              className="textarea h-32 textarea-border border border-white rounded-sm px-3 py-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
            />
          </div>
          <div className="btn flex justify-end">
            <button className="bg-green-500 p-2 rounded-3xl" onClick={handleCreateNote}>Create Note</button>
          </div>
        </div>
      </div>
    </div>
  )
}