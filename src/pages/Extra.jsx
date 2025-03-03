// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import { NavLink, useParams } from 'react-router-dom';
// import { FiPlus,FiTrash2 } from 'react-icons/fi';

import Signup from "./SignupPage/Signup";



// const Feedpage = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

// const [visibleComments, setVisibleComments] = useState({});



//   // useEffect(() => {
//   //   // Get user data from localStorage if available
//   //   const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));

    
//   //   if (storedUser) {
//   //     setLoggedInUser(storedUser);
//   //   }
//   // }, []);

//   // console.log('stored user on feed page:',{LoggedInuser});


//   // const { _id } = useParams(); // Extract userId from URL

//   // console.log('id on feedpage is', _id);

  
  


//   const { _id } = useParams(); // Ensure it matches your route parameter
  
//    console.log('Fetched ID is:   ', _id);
  
   
  
    

    
  

//   const fetchUserPosts = async () => {
//     try {
//       const token = localStorage.getItem('token');

//       const response = await fetch(`${API_BASE_URL}/user/posts/${_id}`, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = await response.json();
//       console.log('Fetched Posts:', data);

//       if (data.success) {
//         setPosts(data.posts);
//       } else {
//         console.error('Error fetching posts:', data.message);
//         setPosts([]);
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       setPosts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (_id) fetchUserPosts();
//   }, [_id]);






//   const handleLike = async (postId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_BASE_URL}/user/post/${postId}/like`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}`, 
//           'Content-Type': 'application/json' 
//         },
//       });
//       const data = await response.json();
//       if (data.success) {
//         setPosts(posts.map(post => post._id === postId ? { ...post, likes: data.likes } : post));
//       }
//     } catch (error) {
//       console.error('Error liking post:', error);
//     }
//   };


//    //handle comments
//   const handleComment = async (postId, comment) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_BASE_URL}/user/post/${postId}/comment`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: comment }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         setPosts(posts.map(post => post._id === postId ? { ...post, comments: data.comments } : post));
        
//       }
//     } catch (error) {
//       console.error('Error commenting on post:', error);
//     }
//   };

// // delete comment
//   const handleDeleteComment = async (postId, commentId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_BASE_URL}/user/post/${postId}/comment/${commentId}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//       });
//       const data = await response.json();

      
//       if (data.success) {
//         setPosts(posts.map(post => post._id === postId ? { ...post, comments: post.comments.filter(c => c._id !== commentId) } : post));
//       }
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };



//   const toggleComments = (postId) => {
//     setVisibleComments(prev => ({ ...prev, [postId]: !prev[postId] }));
//   };



 
 

//   return (
//     <div className="min-h-screen  bg-gray-100">

//        <Navbar userId={_id}/>

//       <div className="max-w-6xl mx-auto py-6">
//         <h2 className="text-2xl font-semibold text-center mb-6">User's Posts</h2>

//         {loading ? (
//           <p className="text-center">Loading...</p>
//         ) : posts.length > 0 ? (
//           <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {posts.map((post) => (
//                 <div key={post._id} className="relative p-4 border rounded-lg shadow-lg">
                  
//                   {/* Only wrap the image and caption with NavLink */}
//                   <NavLink to={`/userpage/${post.user._id}`} className="block">
//                     <img src={post.image.url} alt={post.caption} className="w-full h-56 object-cover rounded-lg" />
//                     <p className="text-center text-sm text-gray-700 mt-2">{post.caption}</p>
//                   </NavLink>

//                   {/* Buttons Section */}
//                   <div className="flex justify-between p-2">
//                     <button 
//                       className="text-blue-500"
//                       onClick={(e) => { e.stopPropagation(); handleLike(post._id); }}
//                     >
//                       Like ({post.likes.length})
//                     </button>
//                     <button 
//                       className="text-green-500"
//                       onClick={(e) => { e.stopPropagation(); toggleComments(post._id); }}
//                     >
//                       Comments ({post.comments.length})
//                     </button>
//                   </div>

//                   {/* Comments Section */}
//                   {visibleComments[post._id] && (
//                     <div className="mt-2 max-h-32 overflow-y-auto border-t pt-2">
//                       <input
//                         type="text"
//                         placeholder="Add a comment..."
//                         className="w-full p-2 border rounded"
//                         onClick={(e) => e.stopPropagation()}  // Prevents page switching
//                         onKeyDown={(e) => {
//                           if (e.key === 'Enter') {
//                             e.stopPropagation();
//                             handleComment(post._id, e.target.value);
//                           }
//                         }}
//                       />
//                       <div className="mt-2 text-sm text-gray-600">
//                         {post.comments.map((c) => (
//                           <div key={c._id} className="flex justify-between items-center">
//                             {/* NavLink for Commenter Profile */}

//                             <div>
//                             <NavLink 
//                               to={`/userpage/${c.user._id}`}  // Correct route for commenter's page
//                               className="text-blue-500 "
//                               onClick={(e) => e.stopPropagation()}  // Prevents switching to post owner
//                             >
//                               {c.user.name || 'Unknown'}
//                             </NavLink>
//                             : {c.text}

//                             </div>
//                             <FiTrash2 
//                               className="text-red-500 cursor-pointer ml-2"
//                               onClick={(e) => { e.stopPropagation(); handleDeleteComment(post._id, c._id); }}
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//         </div>


//         ) : (
//           <p className="text-center">No posts available for this user</p>
//         )}
//       </div>

      
//     </div>
//   );
// };

// export default Feedpage;







// // gallery



// import React, { useState, useEffect } from 'react';
// import { FiPlus,FiTrash2 } from 'react-icons/fi';

// const Gallery = ({ user }) => {
//   const [posts, setPosts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [caption, setCaption] = useState('');
//   const [preview, setPreview] = useState(null);
//   const [visibleComments, setVisibleComments] = useState({});

//   const fetchPosts = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_BASE_URL}/user/${user._id}/posts`, {
//         method: 'GET',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//       });

//       const data = await response.json();
//       if (data.success) {
        
//         console.log('fetchpost data',data);

//         console.log(data.posts); 
//         setPosts(data.posts);
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };

//   useEffect(() => {
//     if (user?._id) fetchPosts();
//   }, [user]);

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


//   const handleLike = async (postId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_BASE_URL}/user/post/${postId}/like`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}`, 
//           'Content-Type': 'application/json' 
//         },
//       });
//       const data = await response.json();
//       if (data.success) {
//         setPosts(posts.map(post => post._id === postId ? { ...post, likes: data.likes } : post));
//       }
//     } catch (error) {
//       console.error('Error liking post:', error);
//     }
//   };


//    //handle comments
//   const handleComment = async (postId, comment) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_BASE_URL}/user/post/${postId}/comment`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: comment }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         setPosts(posts.map(post => post._id === postId ? { ...post, comments: data.comments } : post));
//       }
//     } catch (error) {
//       console.error('Error commenting on post:', error);
//     }
//   };

// // delete comment
//   const handleDeleteComment = async (postId, commentId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_BASE_URL}/user/post/${postId}/comment/${commentId}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//       });
//       const data = await response.json();
//       if (data.success) {
//         setPosts(posts.map(post => post._id === postId ? { ...post, comments: post.comments.filter(c => c._id !== commentId) } : post));
//       }
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };



//   const toggleComments = (postId) => {
//     setVisibleComments(prev => ({ ...prev, [postId]: !prev[postId] }));
//   };


//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold text-center mb-4">Gallery</h2>
//       {user && <p className="text-center text-gray-600">Welcome, {user.name}</p>}
      
//       <div className="flex justify-center mb-4">
//         <button onClick={() => setShowModal(true)} className="bg-green-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-green-600">
//           <FiPlus size={20} /><span>Add Post</span>
//         </button>
//       </div>

//       <div className="grid grid-cols-3 gap-4">
//         {posts.map((post) => (
//           <div key={post._id} className="relative p-4 border rounded-lg shadow-lg">
//             <img src={post.image.url} alt={post.caption} className="w-full h-40 object-cover rounded-lg" />
//             <p className="text-center text-sm text-gray-700 mt-2">{post.caption}</p>
//             <button className="text-blue-500 mt-2" onClick={() => handleLike(post._id)}>Like ({post.likes.length})</button>
//             <button className="text-green-500 mt-2 ml-20" onClick={() => toggleComments(post._id)}>Comments ({post.comments.length})</button>
//             <button className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded" onClick={() => handleDelete(post._id)}>Delete</button>
            
//             {visibleComments[post._id] && (
//                 <div className="mt-2 max-h-32 overflow-y-auto border-t pt-2">
//                   <input type="text" placeholder="Add a comment..." className="w-full p-2 border rounded" 
//                     onKeyDown={(e) => e.key === 'Enter' && handleComment(post._id, e.target.value)} />
//                   <div className="mt-2 text-sm text-gray-600">
//                     {post.comments.map((c) => (
//                       <p key={c._id} className="flex justify-between items-center">
//                         <p><strong>{c.user?.name || 'Unknown'}:</strong> {c.text}</p>
//                         <FiTrash2 className="text-red-500 cursor-pointer mr-2" onClick={() => handleDeleteComment(post._id, c._id)} />
//                       </p>
//                     ))}
//                   </div>
//                 </div>
//               )}

//           </div>
//         ))}
//       </div>



//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg relative">
//             <h3 className="text-lg font-semibold mb-4">Create a New Post</h3>
//             <input type="file" accept="image/*" onChange={(e) => {
//               setSelectedFile(e.target.files[0]);
//               setPreview(URL.createObjectURL(e.target.files[0]));
//             }} className="mb-2" />
//             {preview && <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg mb-2" />}
//             <input type="text" placeholder="Enter caption" value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full p-2 border rounded mb-2" />
//             <div className="flex justify-end space-x-2">
//               <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
//               <button onClick={handlePostUpload} className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Gallery;







// //edit form


// import React, { useState } from 'react';
// import { FiMoreVertical } from 'react-icons/fi';

// const Editform = ({ user, setUser }) => {
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [editedUser, setEditedUser] = useState(user);

//   const handleChange = (e) => {
//     setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem('token'); // Get auth token
//       const response = await fetch(`${API_BASE_URL}/user/edit/${user._id}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(editedUser),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setUser(editedUser);
//         setShowEditForm(false);
//         alert('Profile updated successfully');
//       } else {
//         alert('Failed to update profile');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 ">
//       <div className="bg-white p-6 shadow-lg rounded-lg relative">
//         <button 
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//           onClick={() => setShowEditForm(true)}
//         >
//           <FiMoreVertical size={24} />
//         </button>

//         <h2 className="text-2xl font-bold text-center">{user.name}</h2>
//         <p className="text-gray-500 text-center">{user.bio}</p>
//         <p className="mt-2 text-center">{user.description}</p>
//       </div>

//       {showEditForm && (
//         <div className="fixed  top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center ">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 ">
//             <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

//             <label className="block text-sm font-medium">Name</label>
//             <input 
//               type="text" 
//               name="name"
//               value={editedUser.name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded mb-3"
//             />

//             <label className="block text-sm font-medium">Bio</label>
//             <input 
//               type="text" 
//               name="bio"
//               value={editedUser.bio}
//               onChange={handleChange}
//               className="w-full p-2 border rounded mb-3"
//             />

//             <label className="block text-sm font-medium">Description</label>
//             <textarea 
//               name="description"
//               value={editedUser.description}
//               onChange={handleChange}
//               className="w-full p-2 border rounded mb-3"
//             />

//             <div className="flex justify-end space-x-3">
//               <button 
//                 onClick={() => setShowEditForm(false)} 
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleSave} 
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Editform;


// //upload.js


// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('../config/cloudinary');

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'user_uploads',
//         format: async (req, file) => file.mimetype.split('/')[1], // Auto-detect format
//         public_id: (req, file) => Date.now() + '-' + file.originalname, // Unique filename
//     },
// });

// const upload = multer({
//     storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // 2MB file size limit
// });

// module.exports = upload;


// //login.jsx....


// import {React,useState} from 'react'

 
// import {Link, useNavigate} from 'react-router-dom'

// import {ToastContainer} from 'react-toastify';
// import './Login.css';
// import { handleError, handleSuccess } from '../../utils';




 

// function Login() {


//    const [LoginInfo, setLoginInfo] = useState({

      
//        email:'',
//        password:''
//    })


//    const navigate = useNavigate();

//    const handleChange = (e)=>{
         
//        const {name,value} = e.target;
//        console.log(name,value);

//        const copyLoginInfo = {...LoginInfo};

//        copyLoginInfo[name] = value;

//        setLoginInfo(copyLoginInfo);
//    }

//    console.log('LoginInfo ->',LoginInfo)

//    const handleLogin =async (e)=>{
//         e.preventDefault();

//         const { email, password} =  LoginInfo;

//         if( !email || !password){

//             return handleError('name and email are required')

//         }

//         try {
           
//            const url = "${API_BASE_URL}/auth/login"

//            const response = await fetch(url,{

//                method: "POST",
//                headers:{
//                    'Content-Type':'application/json'
//                },

//                body: JSON.stringify(LoginInfo)
//            });

//            const result = await response.json();

//            console.log('Login Response:', result);

//            const {success, message, jwtToken, user, error} = result;

//            if (success && user?._id) {

//             console.log('user id at loginpage id',user?._id);
               
//                handleSuccess(message);

//                localStorage.setItem('token',jwtToken);
//                localStorage.setItem('loggedInUser',JSON.stringify(user));

//                setTimeout(()=>{

//                 //    navigate(`/personal/${user._id}`);

//                    navigate(`/feed/${user._id}`);

//                },1000)
//            }

//            else if(error){
                
//                const details = error?.details[0].message;
//                handleError(details);
//            }

//            else if(!success){
                
               
//                handleError(message);
//            }

            
//            console.log("login page result",result);

//         } catch (error) {
           
//            handleError(error);
//         }
//    }

//   return (
//     <div className='container'>
//         <h1 className='heading'>Login</h1>

//         <form className='signup-form' onSubmit = {handleLogin} action="">

              

//               <div className='form-group'> 
//                   <label htmlFor="email">Email</label>
//                   <input 
//                   onChange={handleChange}
//                   type="email" 
//                    name='email'
                   
//                    placeholder='Enter your email....'
//                    value={LoginInfo.email}
//                   />
//               </div>

//               <div className='form-group'> 
//                   <label htmlFor="password">Password</label>
//                   <input 
//                   onChange={handleChange}
//                   type="password" 
//                    name='password'
                   
//                    placeholder='Enter your password...'
//                    value={LoginInfo.password}
//                   />
//               </div>

//             <button className='btn-submit' type='submit'>Login</button>

//             <span span className='login-link'>Doesn't have a Account?
//                 <Link to ="/signup">Sign-up</Link>
//             </span>


//         </form>

//         <ToastContainer/>

    
      
//     </div>
//   )
// }

// // export default Login
 


// // //login.css

// // .container {
// //   max-width: 400px;
// //   margin: 50px auto;
// //   padding: 20px;
// //   text-align: center;
// // }

// // .heading {
// //   font-size: 2rem;
// //   margin-bottom: 20px;
// //   color: #333;
// // }

// // .signup-form {
// //   background: #fff;
// //   padding: 20px;
// //   border-radius: 10px;
  
// //   box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
// // }

// // .form-group {
// //   margin-bottom: 15px;
// //   text-align: left;
// //   padding-right: 20px;
// // }

// // .form-group label {
// //   display: block;
// //   font-weight: 500;
// //   margin-bottom: 5px;
// //   color: #555;
// // }

// // .form-group input {
// //   width: 100%;
// //   padding: 10px;
// //   border: 1px solid #ddd;
// //   border-radius: 5px;
// //   box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
// //   font-size: 1rem;
// // }

// // .form-group input:focus {
// //   border-color: #007bff;
// //   outline: none;
// //   box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
// // }

// // .btn-submit {
// //   background: #007bff;
// //   color: #fff;
// //   border: none;
// //   padding: 10px 15px;
  
// //   font-size: 1rem;
// //   border-radius: 5px;
// //   cursor: pointer;
// //   transition: background 0.3s;

// // }

// // .btn-submit:hover {
// //   background: #0056b3;
// // }

// // .login-link {
// //   margin-top: 15px;
// //   display: block;
// //   font-size: 0.9rem;
// //   color: #666;
// // }

// // .login-link a {
// //   color: #007bff;
// //   text-decoration: none;
// //   margin-left: 5px;
// // }

// // .login-link a:hover {
// //   text-decoration: underline;
// // }



// Signup.jsx-----------------------------------------------------------------------------------------------------------------


// import {React,useState} from 'react'

 
// import {Link, useNavigate} from 'react-router-dom'

// import {ToastContainer} from 'react-toastify';
// import './Signup.css';
// import { handleError, handleSuccess } from '../../utils';




 

// function Signup() {


//    const [SignupInfo, setSignupInfo] = useState({

//        name: '',
//        email:'',
//        password:''
//    })


//    const navigate = useNavigate();

//    const handleChange = (e)=>{
         
//        const {name,value} = e.target;
//        console.log(name,value);

//        const copySignupInfo = {...SignupInfo};

//        copySignupInfo[name] = value;

//        setSignupInfo(copySignupInfo);
//    }

//    console.log('SignupInfo ->',SignupInfo)

//    const handleSignup =async (e)=>{
//         e.preventDefault();

//         const {name, email, password} =  SignupInfo;

//         if(!name || !email || !password){

//             return handleError('name, email and password are required')

//         }

//         try {
           
//            const url = "${API_BASE_URL}/auth/signup"

//            const response = await fetch(url,{

//                method: "POST",
//                headers:{
//                    'Content-Type':'application/json'
//                },

//                body: JSON.stringify(SignupInfo)
//            });

//            const result = await response.json();

//            const {success, message, error} = result;

//            if (success) {
               
//                handleSuccess(message);
//                setTimeout(()=>{

//                    navigate('/login')

//                },1000)
//            }

//            else if(error){
                
//                const details = error?.details[0].message;
//                handleError(details);
//            }

//            else if(!success){
                
               
//                handleError(message);
//            }

            
//            console.log(result);
//         } catch (error) {
           
//            handleError(error);
//         }
//    }

//   return (
//     <div className='container'>
//         <h1 className='heading'>Sign-Up</h1>

//         <form className='signup-form' onSubmit = {handleSignup} action="">

//               <div className='form-group'> 
//                   <label htmlFor="name">Name</label>
//                   <input 
//                   onChange={handleChange}
//                   type="text" 
//                    name='name'
//                    autoFocus
//                    placeholder='Enter your name....'
//                    value={SignupInfo.name}
//                   />
//               </div>

//               <div className='form-group'> 
//                   <label htmlFor="email">Email</label>
//                   <input 
//                   onChange={handleChange}
//                   type="email" 
//                    name='email'
                   
//                    placeholder='Enter your email....'
//                    value={SignupInfo.email}
//                   />
//               </div>

//               <div className='form-group'> 
//                   <label htmlFor="password">Password</label>
//                   <input 
//                   onChange={handleChange}
//                   type="password" 
//                    name='password'
                   
//                    placeholder='Enter your password...'
//                    value={SignupInfo.password}
//                   />
//               </div>

//             <button className='btn-submit' type='submit'>Sign-up</button>

//             <span span className='login-link'>Already have an Account?
//                 <Link to ="/login">Login</Link>
//             </span>


//         </form>

//         <ToastContainer/>

    
      
//     </div>
//   )
// }

// export default Signup
 


// Signup.css


// .container {
//   max-width: 400px;
//   margin: 50px auto;
//   padding: 20px;
//   text-align: center;
// }

// .heading {
//   font-size: 2rem;
//   margin-bottom: 20px;
//   color: #333;
// }

// .signup-form {
//   background: #fff;
//   padding: 20px;
//   border-radius: 10px;
  
//   box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
// }

// .form-group {
//   margin-bottom: 15px;
//   text-align: left;
//   padding-right: 20px;
// }

// .form-group label {
//   display: block;
//   font-weight: 500;
//   margin-bottom: 5px;
//   color: #555;
// }

// .form-group input {
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
//   font-size: 1rem;
// }

// .form-group input:focus {
//   border-color: #007bff;
//   outline: none;
//   box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
// }

// .btn-submit {
//   background: #007bff;
//   color: #fff;
//   border: none;
//   padding: 10px 15px;
//   margin-left: ;
//   font-size: 1rem;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background 0.3s;

// }

// .btn-submit:hover {
//   background: #0056b3;
// }

// .login-link {
//   margin-top: 15px;
//   display: block;
//   font-size: 0.9rem;
//   color: #666;
// }

// .login-link a {
//   color: #007bff;
//   text-decoration: none;
//   margin-left: 5px;
// }

// .login-link a:hover {
//   text-decoration: underline;
// }
