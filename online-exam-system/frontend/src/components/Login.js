import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import data from '../../backend/data';
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios';
// import  loginUser  from '../../../backend/src/config/data';
//import axios from 'axios';
// import { useHistory } from 'react-router-dom';

export default function Login () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [data,setData] = useState(""); 
  const navigate = useNavigate();

  // const history = useHistory(); // Initialize useHistory hook

  const validateForm = async (e) => {
    // const{username,password}=req.body;
    e.preventDefault();

    if (username.trim() === "") {
      setUsernameError("Username is required!");
    } else {
      setUsernameError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required!");
    } else {
      setPasswordError("");
    }

    // Add more validation logic if needed

    if (usernameError === "" && passwordError === "") {
      try {
        
        // const  {req.body.username,req.body.password}=data;
        console.log(username);
        console.log(password);
        
        const user = await axios.post("http://localhost:5000/api/auth/login",{
          username,
          password,
          role: 'admin' 
        }).then((response) => {
          console.log(response.data.message);
          if (response.data.success===true){
          navigate("/D");
          }else{
            navigate("/login")
          }
        }).catch((e)=>{
          console.log(e);
        })
       
      } catch(error) {
        console.error('Error logging in user:', error.message);
      }
    }
  };

  return (
    <div className="body">
      <div className="wrapper">
        <h1>Login</h1>
        <form onSubmit={validateForm}>
          <div className="input-box">
            <input type="text" id="username" placeholder="UserName" value={username} onChange={(e) => setUsername(e.target.value)} />
            <i className="bx bxs-user"><FaUser /></i>
            <div className="error-message">{usernameError}</div>
          </div>
          <div className="input-box"><input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <i className="bx bxs-lock-alt"><FaLock /></i>
            <div className="error-message">{passwordError}</div>
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />Remember Me
            </label>

            {/* Replace anchor tag with Link component */}
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
