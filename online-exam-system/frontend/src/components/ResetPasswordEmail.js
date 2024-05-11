import React, { useState } from 'react';
import axios from 'axios';
import "./ResetPasswordEmail.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to your backend to initiate the password reset process
    // You can use Axios or Fetch API for this purpose
    // Here, I'm just displaying a message for demonstration
    console.log(email)
    axios.post("http://localhost:5000/api/auth/reset-password",{
      email
    }).then((res)=>{
      alert(res.message)
    });
    alert(`A password reset link has been sent to ${email}. Check your email`);
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
