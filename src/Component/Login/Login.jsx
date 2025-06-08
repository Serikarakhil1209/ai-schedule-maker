import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Showpassword from '../Showpassword/Showpassword';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Config/Config';


const Login = () => {
  const [active, setActive] = useState(true);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

 


  const navigate = useNavigate();

  const { email, password } = login




   const handleForget = () => {
  navigate('/forgetpassword')   
  }






  const handleSig = () => {
    navigate('/');
    setActive(prev => !prev);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

     const loggeduser = await signInWithEmailAndPassword(auth, email, password)

     localStorage.setItem("user",JSON.stringify(loggeduser))

      navigate('/dashboard')
    } catch (e) {
      console.log("error")
      alert("invalid cheack if you have entered correct email id and password")
    }


  };

  return (
    <div className="signup-container">
      <div className="toggle-buttons">
        <button style={{ background: active ? "black" : "gray" , color:"white" }}>Login</button>
        <button onClick={handleSig}>Signup</button>
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
          required
        />
        <Showpassword
          password={login.password}
          setPassword={(password) => setLogin({ ...login, password })}
        />
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <h1 onClick={handleForget} style={{ cursor: 'pointer', color: 'blue' }}>
        Forget password?
      </h1>
    </div>
  );
};

export default Login;
