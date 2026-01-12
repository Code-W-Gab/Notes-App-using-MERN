import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function ForgotPass() {
  return(
    <div className="flex items-center justify-center min-h-screen px-10">
      <div className="bg-white p-10 rounded-md w-90">
        <div className="mb-4">
          <h1 className="text-center text-2xl font-bold">Forgot Password</h1>
          <p className="text-center text-[12px] mt-2">Enter Email To Forgot Password</p>
        </div>
        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="Email">Email</label>
          <input 
            className="border px-2 py-1 rounded-sm"
            id="Email"
            type="email"
            placeholder="Enter email" 
          />
        </div>
        <button className="bg-blue-600 text-white py-1.5 w-full rounded-md hover:bg-blue-500">Verify</button>
      </div>
    </div>
  )
}