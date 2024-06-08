import React, { useState, useEffect } from 'react';
import { AiOutlineLock, AiOutlineKey } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../data/consts';
import NavBar from '../components/NavBar';

const ResetPWD = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token') || 'No Token Supplied';
    setToken(token);
  }, [location.search]);

  const handleResetPassword = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${baseUrl}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.status < 400) {
        alert(data.message);
        navigate('/auth');
      }
      else alert(data.error);
    } catch (error) {
      alert('Reset password failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="p-10 h-[calc(100vh-70px)] flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Reset-Password Verification Token</label>
              <div className="flex items-center">
                <AiOutlineKey className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  value={token}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Enter your new password</label>
              <div className="flex items-center">
                <AiOutlineLock className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={handleResetPassword}
              disabled={isSubmitting}
              className={`w-full py-2 px-4 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none ${isSubmitting && 'opacity-50'}`}
            >
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPWD;
