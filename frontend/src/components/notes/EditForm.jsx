import { ArrowLeft } from "lucide-react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { getNoteById, updateNote } from "../../services/noteService"
import { useState, useEffect } from "react"
import toast from 'react-hot-toast'

export default function EditForm({ fetchNotes }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    // Services
    getNoteById(id)
      .then(res => {
        setNote(res.data.note)
        setContent(res.data.content)
      })
      .catch(err => {
        toast.error("Failed to fetch note.")
        navigate("/")
        console.log(err)
      })
  }, [id, navigate])

  const handleEditNote = (e) => {
    e.preventDefault()
    if (!note.trim() || !content.trim()) {
      toast.error("Title and Content cannot be empty.")
      return
    }
    // Services
    updateNote(id, note, content)
      .then(res => {
        toast.success("Note Successfully Updated!")
        navigate("/home")
        console.log(res)
        fetchNotes()
      })
      .catch(err => {
        toast.error("Failed to update note.")
        console.log(err)
      })
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
          <h1 className="text-xl mb-5 font-bold">Note Details</h1>
          <form onSubmit={handleEditNote}>
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
              <button type="submit" className="bg-green-500 p-2 rounded-3xl">Edit Note</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}