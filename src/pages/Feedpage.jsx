import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { NavLink, useParams } from 'react-router-dom';
import { FiPlus,FiTrash2, FiHeart,FiMessageSquare } from 'react-icons/fi';

import API_BASE_URL from '../config';



const Feedpage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

const [visibleComments, setVisibleComments] = useState({});



  // useEffect(() => {
  //   // Get user data from localStorage if available
  //   const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));

    
  //   if (storedUser) {
  //     setLoggedInUser(storedUser);
  //   }
  // }, []);

  // console.log('stored user on feed page:',{LoggedInuser});


  // const { _id } = useParams(); // Extract userId from URL

  // console.log('id on feedpage is', _id);

  
  


  const { _id } = useParams(); // Ensure it matches your route parameter
  
  //  console.log('Fetched ID is:   ', _id);
  
   
  
    

    
  

  const fetchUserPosts = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_BASE_URL}/user/posts/${_id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      // console.log('Fetched Posts:', data);

      if (data.success) {
        setPosts(data.posts);
      } else {
        console.error('Error fetching posts:', data.message);
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (_id) fetchUserPosts();
  }, [_id]);






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
    <div className="min-h-screen  bg-gray-100">

       <Navbar userId={_id}/>

      <div className="max-w-6xl mx-auto py-6">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-600">
        PUBLIC-MOMENTS
      </h2>


        {loading ? (
          <p className="text-center">Loading...</p>
        ) : posts.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post) => (
                <div key={post._id} className="relative p-4 border rounded-lg shadow-lg">
                  
                  {/* Only wrap the image and caption with NavLink */}
                  <NavLink to={`/userpage/${post.user._id}`} className="block">
                    <img src={post.image.url} alt={post.caption} className="w-full h-56 object-cover rounded-lg" />
                    <p className="text-center text-sm text-gray-700 mt-2">{post.caption}</p>
                  </NavLink>

                  {/* Buttons Section */}
                  <div className='flex justify-between px-4'>
                      <button className="text-blue-500 mt-2 flex " onClick={() => handleLike(post._id)}>
                          <FiHeart size={20} className="mr-1" />  <span className="text-sm">{post.likes.length}</span>
                        
                      </button>
                                  
                      <button className="text-green-500 mt-2 flex " onClick={() => toggleComments(post._id)}>
                      <FiMessageSquare size={20} className="mr-1" /> 
                      <span className="text-sm">{post.comments.length}</span>
                      </button>
                   </div>

                  {/* Comments Section */}
                  {visibleComments[post._id] && (
                    <div className="mt-2 max-h-32 overflow-y-auto border-t pt-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="w-full p-2 border rounded"
                        onClick={(e) => e.stopPropagation()}  // Prevents page switching
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.stopPropagation();
                            handleComment(post._id, e.target.value);
                          }
                        }}
                      />
                      <div className="mt-2 text-sm text-gray-600">
                        {post.comments.map((c) => (
                          <div key={c._id} className="flex justify-between items-center">
                            {/* NavLink for Commenter Profile */}

                            <div>
                            <NavLink 
                              to={`/userpage/${c.user._id}`}  // Correct route for commenter's page
                              className="text-blue-500 "
                              onClick={(e) => e.stopPropagation()}  // Prevents switching to post owner
                            >
                              {c.user.name || 'Unknown'}
                            </NavLink>
                            : {c.text}

                            </div>
                            <FiTrash2 
                              className="text-red-500 cursor-pointer ml-2"
                              onClick={(e) => { e.stopPropagation(); handleDeleteComment(post._id, c._id); }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
        </div>


        ) : (
          <p className="text-center">No posts available for this user</p>
        )}
      </div>

      
    </div>
  );
};

export default Feedpage;
