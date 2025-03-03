import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';

import API_BASE_URL from '../config';

const UserInfo = ({ user, setUser }) => {
//   const [showEditForm, setShowEditForm] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token'); // Get auth token
      const response = await fetch(`${API_BASE_URL}/user/edit/${user._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });

      const data = await response.json();
      if (data.success) {
        setUser(editedUser);
        setShowEditForm(false);
        alert('Profile updated successfully');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <div className="bg-white p-6 shadow-lg rounded-lg relative">
        {/* <button 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setShowEditForm(true)}
        >
          <FiMoreVertical size={24} />
        </button> */}

        <h2 className="text-2xl font-bold text-center">{user.name}</h2>
        <p className="text-gray-500 text-center">{user.bio}</p>
        <p className="mt-2 text-center">{user.description}</p>
      </div>

      {/* {showEditForm && (
        <div className="fixed  top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 ">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <label className="block text-sm font-medium">Name</label>
            <input 
              type="text" 
              name="name"
              value={editedUser.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-sm font-medium">Bio</label>
            <input 
              type="text" 
              name="bio"
              value={editedUser.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-sm font-medium">Description</label>
            <textarea 
              name="description"
              value={editedUser.description}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowEditForm(false)} 
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default UserInfo;
