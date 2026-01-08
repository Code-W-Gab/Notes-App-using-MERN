import { useParams } from "react-router-dom";
import Header from "../../components/admin/Header";
import UserNoteList from "../../components/admin/UserNoteList";
import { useEffect, useState } from "react";
import { GetNoteById } from "../../services/adminService";

export default function AdminNotePage() {
  const { id } = useParams()
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetNoteById(id)
      .then(res => {
        setNotes(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id])

  return(
    <div>
      <Header/>
      <UserNoteList notes={notes} loading={loading} userId={id}/>
    </div>
  )
}