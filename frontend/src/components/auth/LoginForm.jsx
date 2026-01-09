import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Login } from "../../services/authService"
import toast from "react-hot-toast"
import GoogleBtn from "./GoogleBtn"
import ForgotPass from "./ForgotPass"
import Divider from "./Divider"

export default function LoginForm({fetchNotes}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault() // Prevent default form action
    if (!email.trim() || !password.trim()) {
      toast.error("Email and Password cannot be empty.")
      return  
    }

    // Auth Services
    Login(email, password)
      .then(res => {
        // Save token
        localStorage.setItem("token", res.data.token);
        setEmail("")
        setPassword("")
        fetchNotes()
        toast.success("Successfully Login!")
        if (res.data.role !== "admin") return navigate('/home')
        navigate('/admin')
      })
  }

  return(
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-md w-90">
        <h1 className="text-center text-2xl font-bold mb-4">Login</h1>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="Email">Email</label>
          <input 
            className="border px-2 py-1 rounded-sm"
            id="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email" 
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="Password">Password</label>
          <input 
            className="border px-2 py-1 rounded-sm mb-4"
            id="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password" 
          />
        </div>
        <button className="bg-blue-600 text-white py-1.5 w-full rounded-md hover:bg-blue-500" onClick={handleLogin}>Sign In</button>
        <ForgotPass/>
        <Divider/>
        <GoogleBtn/>
        <div className="flex gap-2 justify-center mt-2 text-sm">
          <p>Don't have an account?</p>
          <Link to={'/register'}>
            <span className="text-blue-500 underline">Sign Up?</span>
          </Link>
        </div>
      </div>
    </div>
  )
}