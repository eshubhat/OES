import React, { useState } from 'react';
import axios from 'axios';
import "./ResetPassword.css";
import { useParams,useNavigate } from 'react-router-dom';

const ForgotPasswordLink = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    // Implement your password reset logic here
    // For example, you can send a request to your backend
    console.log(params.studentid);
    axios.post(`http://localhost:5000/api/auth/password-reset/${params.studentid}`,{
        password
    }).then(res =>{
        alert(res.message);
        navigate('/');
    })
    // to handle the password reset
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPasswordLink;
