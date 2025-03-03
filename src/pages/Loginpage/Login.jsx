import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils';

import API_BASE_URL from '../../config';

function Login() {
  const [LoginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...LoginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo;

    if (!email || !password) {
      return handleError('Email and password are required');
    }

    try {
      const url =` ${API_BASE_URL}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(LoginInfo)
      });

      const result = await response.json();
      const { success, message, jwtToken, user, error } = result;

      if (success && user?._id) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', JSON.stringify(user));

        setTimeout(() => {
          navigate(`/feed/${user._id}`);
        }, 1000);
      } else if (error) {
        handleError(error?.details[0]?.message || "Login failed");
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      {/* Welcome Section */}
      <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to Momento!</h1>
        <p className="text-gray-600 text-lg mt-2">Capture, Share, and Relive Your Special Moments</p>
      </div>

      {/* Login Form */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-[400px] max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={LoginInfo.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={LoginInfo.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?
          <Link to="/signup" className="text-blue-600 hover:underline ml-1">Sign up</Link>
        </p>
      </div>
      
      <ToastContainer />
    </div>
  );
}

export default Login;
