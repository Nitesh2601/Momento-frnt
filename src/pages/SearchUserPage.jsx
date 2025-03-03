import React, { useEffect, useState } from 'react';
import UserInfo from '../components/UserInfo';
import { useParams } from 'react-router-dom';
import Usergallery from '../components/Usergallery';

import API_BASE_URL from '../config';

const SearchUserPage = () => {
  const { _id } = useParams(); // Ensure it matches your route parameter

  // console.log('Fetched ID is:   ', _id);

  const [user, setUser] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');

      // console.log('Token of pp:', token); 

      const response = await fetch(`${API_BASE_URL}/user/${_id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      // console.log('API Response:', data); // Debugging line

      if (data.success) {
        setUser(data.user);
      } else {
        console.error('Failed to fetch user:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [_id]);

  return (
    <div className=''>


             
             <div className=' relative z-10'>
                 {user ? <UserInfo user={user} setUser={setUser} /> : <p>Loading...</p>}
             </div>
              
          
               {user ? <Usergallery user={user} /> : <p>Loading...</p>} 
            
           
    </div>
  );
};

export default SearchUserPage;
