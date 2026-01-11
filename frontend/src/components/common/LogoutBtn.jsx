import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LogoutBtn() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token or user info from localStorage/sessionStorage
    localStorage.removeItem("token"); // adjust key as needed
    // Redirect and replace history
    navigate("/", { replace: true });
  };

  return(
    <>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 p-2 rounded-3xl text-white">
        <LogOut size={20} className="max-sm:size-5"/>
        <span className="max-sm:text-sm">Logout</span>
      </button>
    </>
  )
}