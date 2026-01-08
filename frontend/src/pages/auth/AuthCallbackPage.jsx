import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AuthCallbackPage({ fetchNotes }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      toast.error('Authentication failed. Please try again.');
      navigate('/');
      return;
    }

    if (token) {
      // Save token to localStorage
      localStorage.setItem('token', token);
      
      // Fetch notes after successful login
      fetchNotes();
      
      toast.success('Successfully logged in with Google!');
      
      // Decode token to check role (optional)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } catch {
        navigate('/home');
      }
    } else {
      navigate('/');
    }
  }, [searchParams, navigate, fetchNotes]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}