import React, { use, useState } from 'react';
import { IoSunnyOutline, IoMoon } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext/ThemeContext';

function Navbar() {
  const navigate = useNavigate()
  const {darkTheme,toggleTheme} = useTheme()

  const handleLogout=()=>{
    navigate('/login')
  }
  return (
    <div
      className={`w-full flex justify-end px-6 py-4 ${
        darkTheme ? 'bg-white text-black' : 'bg-black text-white'
      }`}
    >
      <div className="text-2xl font-bold">AV.ai</div>
      
   
    </div>
  );
}

export default Navbar;
