import { Plus } from "lucide-react"
import { Link } from "react-router-dom"
import LogoutBtn from "./LogoutBtn"

export default function Header() {
  return(
    <header className="py-3 border-b px-10 bg-black"> 
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl text-green-500">NuruNotes</h1>
        <div className="flex items-center gap-2">
          <div>
            <Link to="/create" className="flex items-center gap-2 bg-green-500 p-2 rounded-3xl text-white">
              <Plus size={20}/>
              <span>Add Note</span>
            </Link>
          </div>
          <div>
            <LogoutBtn/>
          </div>
        </div>
      </div>
    </header>
  )
}