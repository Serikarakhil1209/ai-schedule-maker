import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Showpassword from '../Showpassword/Showpassword';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth , db } from '../../Config/Config';
import { getDoc , doc, setDoc } from 'firebase/firestore';

function Signup() {
  const [signup, setSignup] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createaccount = await createUserWithEmailAndPassword(auth, signup.email, signup.password);
      const user =createaccount.user
      await setDoc(doc(db,"users", user.uid),{
        name:signup.name,
        email:signup.email,
        id:Date.now()
      })
      

      navigate('/login');
    } catch (err) {
      console.log("Signup error:", err);
      alert(err.message);  
    }
  };

  return (
    <div className="signup-container">
      <div className="toggle-buttons">
        <button onClick={handleLogin}>Login</button>
        <button className="active">Signup</button>
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={signup.name}
          onChange={(e) => setSignup({ ...signup, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={signup.email}
          onChange={(e) => setSignup({ ...signup, email: e.target.value })}
          required
        />
        <Showpassword
          password={signup.password}
          setPassword={(password) => setSignup({ ...signup, password })}
        />
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
