import { Link } from "react-router-dom";

export default function ForgotPassBtn() {
  return(
    <div className="flex justify-end mt-1 mb-5">
      <Link to={'/forgot-pass'}>
      <button className="underline text-sm text-blue-500">Forgot Password</button>
      </Link>
    </div>
  )
}