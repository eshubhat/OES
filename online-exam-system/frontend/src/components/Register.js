// Registration.js
import axios from 'axios';
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const validateForm = async (e) => {
    e.preventDefault();

    try {
      axios.post('http://localhost:5000/api/auth/register', {
        email,
        username,
        password,
        role: 'student' // Set role here as needed
      }).then((response) => {
        if(!response.data.error)
          alert("Registered successfully!");
          navigate('/');
      });

      // You can redirect user to another page upon successful registration
      // Example: history.push('/login');
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      // Handle registration error (display error message, etc.)
    }
  };


  return (
    <div className="Register">
      <div className="wrapper">
        <h1>Registration</h1>
        <form onSubmit={validateForm}>
          {/* <div className="input-box">
            <input
              type="text"
              id="fullname"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              />
            <i className="bx bxs-user"><FaUser /></i>
          
          </div> */}
          <div className="input-box">
            <input
              type="text"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="bx bxs-envelope"><FaEnvelope /></i>
            
          </div>
          <div className="input-box">
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className="bx bxs-user"><FaUser /></i>

          </div>
          <div className="input-box">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="bx bxs-lock-alt"><FaLock /></i>
          
          </div>

          <button type="submit" className="btn" >
            Register
          </button>
        </form>
        <div className="register-link">
          <p>
            Already have an account?{" "}
            <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
