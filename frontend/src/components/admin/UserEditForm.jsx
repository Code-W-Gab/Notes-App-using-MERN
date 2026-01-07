import { ArrowLeft } from "lucide-react"
import { Link, useParams, useNavigate} from "react-router-dom"
import { useState, useEffect } from "react"
import { GetUserById, UpdateUser } from "../../services/adminService"
import toast from "react-hot-toast"

export default function UserEditForm({fetchUser}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")

  useEffect(() => {
    // Admin Services
    GetUserById(id)
      .then(res => {
        setEmail(res.data.email)
        setRole(res.data.role)
      })
      .catch(err => {
        toast.error("Failed to fetch account.")
        navigate("/")
        console.log(err)
      })
  }, [id, navigate])

  function handleEditUser(e) {
    e.preventDefault()  
    UpdateUser(id, role)
      .then(res => {
        toast.success("User Successfully Update")
        console.log(res)
        navigate('/admin')
        fetchUser()
      })
      .catch(err => {
        toast.error("Failed to update account!")
        console.log(err)
      })
  }

  return(
    <div className="flex justify-center p-6">
      <div className="w-full max-w-xl text-white rounded">
        <nav className="flex gap-2 items-center mb-10">
          <Link to="/admin">
            <ArrowLeft size={20}/>
          </Link>
          <span>Back to notes</span>
        </nav>
        <div className="bg-[#141212] p-5 rounded-xl">
          <h1 className="text-xl mb-5 font-bold">Account Details</h1>
          <form onSubmit={handleEditUser}>
            <div className="flex flex-col mb-3 gap-1">
              <label htmlFor="email">Email</label>
              <input 
                id="email"
                className="border border-white rounded-sm px-3 py-1.5"
                type="text"
                value={email}
                readOnly
                placeholder="Email" 
              />
            </div>
            <div className="flex flex-col mb-5 gap-1">
              <label htmlFor="">Role</label>
              <select 
              className="border p-2 rounded-sm"
              value={role}
              onChange={(e) => setRole(e.target.value)}              
              >
                <option value="admin" className="text-black">Admin</option>
                <option value="user" className="text-black">User</option>
              </select>
            </div>
            <div className="btn flex justify-end">
              <button type="submit" className="bg-green-500 p-2 rounded-3xl">Edit Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}