import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils';
import API_BASE_URL from '../../config';

function Signup() {
  const [SignupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...SignupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = SignupInfo;

    if (!name || !email || !password || !confirmPassword) {
      return handleError('All fields are required');
    }

    if (password !== confirmPassword) {
      return handleError('Passwords do not match');
    }

    try {
      const url = `${API_BASE_URL}/auth/signup`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate('/login'), 1000);
      } else if (error) {
        handleError(error?.details?.[0]?.message || 'Signup failed');
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-2 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.03),transparent_50%)]"></div>

      {/* Welcome Section */}
      <div className="text-center mb-6 relative z-10">
        <h1 className="text-4xl font-black text-white drop-shadow-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Momento</h1>
        <div className="w-44 h-1 mt-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mb-4 rounded-full"></div>
        <p className="text-gray-300 text-lg font-light tracking-wide">Create an account to capture your memories</p>
      </div>

      {/* Signup Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-[400px] max-w-md text-white relative z-10">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-3xl blur opacity-60"></div>

        <div className="relative">
          <h1 className="text-3xl font-bold text-center mb-6 text-white">Sign Up</h1>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label className="block mb-2 font-medium text-gray-200 tracking-wide">Name</label>
              <input
                type="text"
                name="name"
                value={SignupInfo.name}
                onChange={handleChange}
                placeholder="Enter your name..."
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-gray-400 backdrop-blur-sm transition-all duration-200"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-200 tracking-wide">Email</label>
              <input
                type="email"
                name="email"
                value={SignupInfo.email}
                onChange={handleChange}
                placeholder="Enter your email..."
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-gray-400 backdrop-blur-sm transition-all duration-200"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-200 tracking-wide">Password</label>
              <input
                type="password"
                name="password"
                value={SignupInfo.password}
                onChange={handleChange}
                placeholder="Enter your password..."
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-gray-400 backdrop-blur-sm transition-all duration-200"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-200 tracking-wide">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={SignupInfo.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password..."
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-gray-400 backdrop-blur-sm transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-8 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-300">
            Already have an account?
            <Link to="/login" className="ml-1 text-indigo-300 hover:text-indigo-200 transition-colors duration-200 font-semibold">Login</Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Signup;
