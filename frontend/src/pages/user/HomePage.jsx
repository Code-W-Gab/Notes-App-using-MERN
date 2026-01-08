import Header from "../../components/common/Header";
import List from "../../components/notes/List";

export default function HomePage({ notes, fetchNotes }) {
  return(
    <div>
      <Header/>
      <List notes={notes} fetchNotes={fetchNotes}/>
    </div>
  )
}