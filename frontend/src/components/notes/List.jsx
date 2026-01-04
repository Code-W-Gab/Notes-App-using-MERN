import { Trash, Pencil } from "lucide-react"
import { Link } from "react-router-dom"
import { deleteNote } from "../../services/noteService";
import toast from 'react-hot-toast'

export default function List({ notes, fetchNotes }) {

  // Delete Notes
  function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;
    
    // Services
    deleteNote(id)
      .then(res => {
        console.log(res)
        toast.success("Note Successfully Deleted!")
        fetchNotes()
      })
      .catch(err => console.log(err))
  }

  return(
    <div className="m-10 grid grid-cols-4 gap-3 text-white">
      {
        notes.length === 0
        ? <div><h1 className="text-white font-bold text-xl">No Notes</h1></div>
        : notes.map((Note) => {
          return <div key={Note._id} className="bg-[#141212] p-4 rounded-md">
            <h1 className="font-bold mb-2 text-lg">{Note.note}</h1>
            <p className="text-sm">{Note.content}</p>
            <div className="flex items-center justify-end gap-3 mt-4">
              <Trash onClick={() => handleDelete(Note._id)} size={18} className="text-red-600"/>
              <Link to={`/edit/${Note._id}`}>
                <Pencil size={18} className="text-green-600"/>
              </Link>
            </div>
          </div>
        })
      }
    </div>
  )  
}
