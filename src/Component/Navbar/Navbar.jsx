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
      className={`w-full flex items-center justify-between px-6 py-4 ${
        darkTheme ? 'bg-white text-black' : 'bg-black text-white'
      }`}
    >
      <div className="text-2xl font-bold">AV.ai</div>
      
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="focus:outline-none">
          {darkTheme ? <IoSunnyOutline size={24} /> : <IoMoon size={24} /> }
        </button>
    
      </div>
    </div>
  );
}

export default Navbar;
