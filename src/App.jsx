import { useState } from 'react'
import './App.css'


import {  Routes, Route } from 'react-router-dom'

import Home from './pages/Homepage/Home';


import Personalpage from './pages/Personalpage'

import Feedpage from './pages/Feedpage'

import SearchUserPage from './pages/SearchUserPage'
import Login from './pages/Loginpage/Login'
import Signup from './pages/SignupPage/Signup'

function App() {
  

  return (
    <>
      

      <div className='w-ful  mx-0 my-auto'>

          <Routes>

            <Route path='/' element={<Login/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/personal/:_id' element={<Personalpage/>} />
            <Route path='/userpage/:_id' element={<SearchUserPage/>} />
            <Route path='/feed/:_id' element={<Feedpage/>} />
            <Route path='/signup' element={<Signup />} />
          
          

          </Routes>
      
       </div>
    </>
  )
}

export default App
