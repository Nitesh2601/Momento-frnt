import {React,useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../utils';
import {ToastContainer } from 'react-toastify';
import './Home.css'



function Home() {

   const [LoggedInUser, setLoggedInUser] = useState('');

   const navigate = useNavigate();

   useEffect(() => {
     
    setLoggedInUser(localStorage.getItem('loggedInUser'))
   
     
   }, [])

   const handleLogout = ()=>{

    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');

    handleSuccess('User Loggedout');

    setTimeout(()=>{
     
      navigate('/login');
      
    },1000)

   }
   

  return (
    <div className='cover'>
      <h1 className='greet'>Welcome {LoggedInUser} ! </h1>
      <button className='btn-submit' onClick={handleLogout}>Logout</button>

      <ToastContainer/>
      
    </div>
  )
}

export default Home
