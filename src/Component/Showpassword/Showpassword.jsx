import React, { useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import './Showpassword.css'; 

function Showpassword({ password, setPassword }) {
  const [showState, setShowState] = useState(false);

  const handleToggle = () => {
    setShowState((prev) => !prev);
  };

  return (
    <div className="password-container">
      <input
        type={showState ? 'text' : 'password'}
        placeholder="ENTER PASSWORD"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="password-input"
      />
      <button
        type="button"
        onClick={handleToggle}
        className="icon-button"
      >
        {showState ? <IoIosEyeOff /> : <IoIosEye />}
      </button>
    </div>
  );
}

export default Showpassword;
