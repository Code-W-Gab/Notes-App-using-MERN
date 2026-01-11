import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function UserNoteList({ notes, loading, userId }) {
  if (loading) {
    return (
      <div className="p-5">
        <h1 className="text-green-600 text-lg font-bold">Note List</h1>
        <p className="text-white mt-4">Loading...</p>
      </div>
    );
  }

  return(
    <div className="p-5">
      <nav className="flex gap-2 items-center text-white mb-4 ">
        <Link to="/admin">
          <ArrowLeft size={20}/>
        </Link>
        <span>Back to admin</span>
      </nav>
      <h1 className="text-green-600 text-lg font-bold">Note List (User ID: {userId})</h1>
      <div className="mt-5 grid grid-cols-3 gap-3 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3">
        {notes.length === 0 ? (
          <p className="text-white">No notes found for this user.</p>
        ) : (
          notes.map((Note) => (
            <div key={Note._id} className="text-white bg-[#141212] p-4 rounded-md">
              <p>Id: {Note._id}</p>
              <p>Note: {Note.note}</p>
              <p>Content: {Note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}