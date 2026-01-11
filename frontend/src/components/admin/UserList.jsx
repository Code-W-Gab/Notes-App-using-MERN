import { DeleteUser, User } from "../../services/adminService"
import { Trash, Pencil, NotebookPen } from "lucide-react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { useEffect } from "react";

export default function UserList({ user, fetchUser}) {

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  // Delete User/Account
  function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this account?");
    if (!confirmed) return;
    
    // Admin Services
    DeleteUser(id)
      .then(res => {
        console.log(res)
        toast.success("Account Successfully Deleted!")
        fetchUser()
      })
      .catch(err => console.log(err))
  }

  return(
    <div className=" p-5">
      <h1 className="text-green-600 text-lg font-bold">User List</h1>
      <div className="mt-5 grid grid-cols-4 gap-3 text-white max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3">
        {
          user.length === 0
          ? <div><h1 className="text-white font-bold text-xl">No User</h1></div>
          : user.map((User) => {
            return <div key={User._id} className="bg-[#141212] p-4 rounded-md w-full">
              <h1 className="font-bold mb-2 text-lg">{User.email}</h1>
              <p className="text-sm">{User.role}</p>
              <div className="flex items-center justify-end gap-3 mt-4">
                <Trash onClick={() => handleDelete(User._id)} size={18} className="text-red-600"/>
                <Link to={`/user/edit/${User._id}`}>
                  <Pencil size={18} className="text-green-600"/>
                </Link>
                <Link to={`/notes/${User._id}`}>
                  <NotebookPen size={18} className="text-blue-600"/>
                </Link>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}