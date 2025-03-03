import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

import API_BASE_URL from '../config';

const Navbar = ({ userId }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setUser(data.user);
      } else {
        console.error('Failed to fetch user:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged Out');

    setTimeout(() => {
      navigate('/login');
      window.location.reload();
    }, 1000);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/user/query/search?query=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setSearchResults(data.users);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg relative">
      <div className="mx-auto flex justify-between items-center w-full">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold ">
          Momento 
        </NavLink>

        {/* Search Bar */}
        <div className="flex-grow mx-6 max-w-lg relative">
          <input
            type="text"
            placeholder="Search by username or name..."
            className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />

          {/* Display search results */}
          {searchResults.length > 0 && (
            <div className="absolute z-50 w-full bg-gray-400 text-black border rounded-lg mt-1 shadow-lg">
              {searchResults.map((user) => (
                <NavLink
                  key={user._id}
                  to={`/userpage/${user._id}`}
                  className="block p-2 hover:bg-gray-500"
                  onClick={() => setSearchQuery('')}
                >
                  <div className="flex items-center space-x-2">
                    {/* <img
                      src={user.profilePic || 'https://via.placeholder.com/40'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    /> */}
                    {/* <span>{user.name} (@{user.username})</span> */}
                    <FaUserCircle className="text-white w-4 h-4" />
                    <span>{user.name}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Profile & Logout Section */}
        <div className="flex items-center space-x-4">
          {/* User Profile */}
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            <>
              <div className="text-lg font-semibold text-white px-4 py-2 bg-gray-800 rounded-lg shadow-md" 
              >{user?.name}

              </div>
              
              <NavLink to={`/personal/${userId}`}>
                <div className="w-10 h-10 bg-gray-500 rounded-full overflow-hidden border border-gray-400 flex items-center justify-center">
                <FaUserCircle className="text-white w-8 h-8" />
                </div>
              </NavLink>
            </>
          )}

          {/* Logout Button */}
          <button onClick={handleLogout} className="text-red-500 hover:text-red-400 transition">
            <FiLogOut size={24} />
          </button>
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
