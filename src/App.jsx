import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {  Routes, Route } from 'react-router-dom';
import Signup from './Component/Signup/Signup';
import Login from './Component/Login/Login';
import Dashboard from './Component/Dashboard/Dashboard';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';
import Goals from './Component/Dashboard/Goals/Goals'
import Main from './Component/Dashboard/Main/Main';



function App() {
 

  return (
   <>
   <Routes>
    <Route path='/' element={<Signup/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/dashboard' element={<Dashboard/>}>
    <Route index element={<Main/>} />
    <Route path='Goals' element={<Goals/>} />
    
    </Route>
    <Route path='/forgetpassword' element={<ForgetPassword/>}/>

   </Routes>
   </>
  )
}

export default App
