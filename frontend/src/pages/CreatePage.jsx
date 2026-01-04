import Form from "../components/notes/Form"

export default function CreatePage({ fetchNotes }) {
  return(
    <div>
      <Form fetchNotes={fetchNotes}/>
    </div>
  )
}