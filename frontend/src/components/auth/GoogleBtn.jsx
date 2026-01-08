import google from '../../assets/google.png'

export default function GoogleBtn() {
  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth route
    window.location.href = 'http://localhost:3001/auth/google';
  };

  return(
    <button 
      onClick={handleGoogleLogin}
      className='flex gap-2 items-center justify-center border mt-3 py-1 rounded-md'
    >
      <img src={google} alt="google" className='w-5'/>
      <span className='text-md'>Connect with Google</span>
    </button>
  )
}