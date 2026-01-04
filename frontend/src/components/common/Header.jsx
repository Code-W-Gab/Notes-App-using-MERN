import { Plus, LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token or user info from localStorage/sessionStorage
    localStorage.removeItem("token"); // adjust key as needed
    // Redirect and replace history
    navigate("/", { replace: true });
  };

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
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 p-2 rounded-3xl text-white"
            >
              <LogOut size={20}/>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}