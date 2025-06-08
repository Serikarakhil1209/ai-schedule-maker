import React, { useState } from 'react';
import { auth , db } from '../../Config/Config';
import { fetchSignInMethodsForEmail ,sendPasswordResetEmail} from 'firebase/auth';
import './ForgetPassword.css';

function ForgetPassword() {
  const [Forgetemail, SetForgetemail] = useState({ email: "" });

  const {email} = Forgetemail 

  const handleForget = async(e) => {
    e.preventDefault()
    try{
    const cheackemail =    await  fetchSignInMethodsForEmail(auth, email)
    if (cheackemail.length === 0) {
      sendPasswordResetEmail(auth,email)
    } else {
      alert("Entered email is not registered");
    }
    
    }catch(e){

      console.log("invalid")

    }
  };

  return (
    <div className="forget-container">
  <h2>Reset Your Password</h2>
  <input
    type="email"
    placeholder="Enter your email"
    value={Forgetemail.email}
    onChange={(e) => SetForgetemail({ email: e.target.value })}
  />
  <button onClick={handleForget}>Submit</button>
</div>

  );
}

export default ForgetPassword;
