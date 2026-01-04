import EditForm from "../components/notes/EditForm";

export default function NoteDetailPage({ fetchNotes }) {
  return(
    <>
      <EditForm fetchNotes={fetchNotes}/>
    </>
  )
}