import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Register } from "../../services/authService"
import toast from 'react-hot-toast'
import GoogleBtn from "./GoogleBtn"
import Divider from "./Divider"


export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault() // Prevent default form action
    if (!email.trim() || !password.trim()) {
      toast.error("Email and Password cannot be empty.")
      return  
    }
    
    // Error Handling
    if (!email.includes("@") || !email.includes(".com")) return toast.error("Please enter a valid email address.")
    if (password.length < 8) return toast.error("Password must contain at least 8 char")

    Register(email, password)
      .then(res => {
        console.log(res)
        setEmail("")
        setPassword("")
        toast.success("Successfully Created!")
        navigate('/')
      })
      .catch(err => {
        if (err.response?.status === 400) return toast.error("Email already exists. Please use a different email.")
      })
  }

  return(
    <div className="flex items-center justify-center min-h-screen px-10">
      <div className="bg-white p-10 rounded-md w-90 max-sm:px-7">
        <h1 className="text-center text-2xl font-bold mb-4">Sign Up</h1>
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
        <button className="bg-blue-600 text-white py-1.5 w-full rounded-md hover:bg-blue-500" onClick={handleSignUp}>Sign In</button>
        <Divider/>
        <GoogleBtn/>
        <div className="flex gap-2 justify-center mt-2 text-sm max-sm:flex-col text-center">
          <p>Already have an account?</p>
          <Link to={'/'}>
            <span className="text-blue-500 underline">Sign in?</span>
          </Link>
        </div>
      </div>
    </div>
  )
}