import React, { useState, useEffect } from 'react';
import { FiPlus,FiTrash2 } from 'react-icons/fi';

import API_BASE_URL from '../config';

const Usergallery = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [preview, setPreview] = useState(null);
  const [visibleComments, setVisibleComments] = useState({});

  

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/user/${user._id}/posts`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      if (data.success) {
        
        // console.log('fetchpost data',data);

        // console.log(data.posts); 
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    if (user?._id) fetchPosts();
  }, [user]);

//   const handlePostUpload = async () => {
//     if (!selectedFile || !caption) return;
    
//     const formData = new FormData();
//     formData.append('image', selectedFile);
//     formData.append('caption', caption);
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_BASE_URL}/user/${user._id}/upload`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` },
//         body: formData,
//       });

//       const data = await response.json();
//       if (data.success) {

//         setShowModal(false);
//         setPosts([...posts, data.post]);
        
//         setSelectedFile(null);
//         setCaption('');
//         setPreview(null);
//       }
//     } catch (error) {
//       console.error('Error uploading post:', error);
//     }
//   };

//   const handleDelete = async (postId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_BASE_URL}/user/${user._id}/delete/${postId}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` },
//       });

//       const data = await response.json();
//       if (data.success) setPosts(posts.filter(post => post._id !== postId));
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };


  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/user/post/${postId}/like`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        },
      });
      const data = await response.json();
      if (data.success) {
        setPosts(posts.map(post => post._id === postId ? { ...post, likes: data.likes } : post));
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };


   //handle comments
  const handleComment = async (postId, comment) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/user/post/${postId}/comment`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: comment }),
      });
      const data = await response.json();
      if (data.success) {
        setPosts(posts.map(post => post._id === postId ? { ...post, comments: data.comments } : post));
      }
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

// delete comment
  const handleDeleteComment = async (postId, commentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/user/post/${postId}/comment/${commentId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.success) {
        setPosts(posts.map(post => post._id === postId ? { ...post, comments: post.comments.filter(c => c._id !== commentId) } : post));
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };



  const toggleComments = (postId) => {
    setVisibleComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Gallery</h2>
      {user && <p className="text-center pb-4 text-gray-600">{user.name}</p>}
      
      {/* <div className="flex justify-center mb-4">
        <button onClick={() => setShowModal(true)} className="bg-green-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-green-600">
          <FiPlus size={20} /><span>Add Post</span>
        </button>
      </div> */}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post._id} className="relative p-4 border rounded-lg shadow-lg">
            <img src={post.image.url} alt={post.caption} className="w-full h-40 object-cover rounded-lg" />
            <p className="text-center text-sm text-gray-700 mt-2">{post.caption}</p>
            <button className="text-blue-500 mt-2" onClick={() => handleLike(post._id)}>Like ({post.likes.length})</button>
            <button className="text-green-500 mt-2 ml-20" onClick={() => toggleComments(post._id)}>Comments ({post.comments.length})</button>
            {/* <button className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded" onClick={() => handleDelete(post._id)}>Delete</button> */}
            
            {visibleComments[post._id] && (
                <div className="mt-2 max-h-32 overflow-y-auto border-t pt-2">
                  <input type="text" placeholder="Add a comment..." className="w-full p-2 border rounded" 
                    onKeyDown={(e) => e.key === 'Enter' && handleComment(post._id, e.target.value)} />
                  <div className="mt-2 text-sm text-gray-600">
                    {post.comments.map((c) => (
                      <p key={c._id} className="flex justify-between items-center">
                        <p><strong>{c.user?.name || 'Unknown'}:</strong> {c.text}</p>
                        <FiTrash2 className="text-red-500 cursor-pointer mr-2" onClick={() => handleDeleteComment(post._id, c._id)} />
                      </p>
                    ))}
                  </div>
                </div>
              )}

          </div>
        ))}
      </div>



      {/* {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg relative">
            <h3 className="text-lg font-semibold mb-4">Create a New Post</h3>
            <input type="file" accept="image/*" onChange={(e) => {
              setSelectedFile(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }} className="mb-2" />
            {preview && <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg mb-2" />}
            <input type="text" placeholder="Enter caption" value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full p-2 border rounded mb-2" />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              <button onClick={handlePostUpload} className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Usergallery;
