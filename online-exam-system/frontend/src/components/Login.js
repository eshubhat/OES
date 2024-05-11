import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Login.css";

import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios';


export default function Login () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateForm = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      setemailError("email is required!");
    } else {
      setemailError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required!");
    } else {
      setPasswordError("");
    }

    if (emailError === "" && passwordError === "") {
      try {
        axios.post("http://localhost:5000/api/auth/login",{
          email,
          password
        }).then((response) => {
          if (response.data.success===true){
            alert("Logging in...");
            if(response.data.role === 'admin'){
              navigate("/D");
              localStorage.setItem('adminid',response.data.id)
            } else {
              localStorage.setItem('studentid',response.data.id)
              navigate(`/studentdashboard/${response.data.id}`);
            }
          }
        }).catch((e)=>{
          alert("User data not found in database");
          navigate("/register");
        })
       
      } catch(error) {
        console.error('Error logging in user:', error.message);
      }
    }
  };

  return (
    <div className="Login" >
      <div className="wrapper">
        <h1>Login</h1>
        <form onSubmit={validateForm}>
          <div className="input-box">
            <input type="text" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <i className="bx bxs-user"><FaUser /></i>
            <div className="error-message">{emailError}</div>
          </div>
          <div className="input-box"><input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <i className="bx bxs-lock-alt"><FaLock /></i>
            <div className="error-message">{passwordError}</div>
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />Remember Me
            </label>
            <Link to="/ForgotPassword">Forgot Password</Link>
          </div>

          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <div className="register-link">
          <p>
            Don't Have An Account ?{" "}
            <Link to="/Register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
