// Registration.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  // const [fullname, setFullname] = useState("");
  // const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [fullnameError, setFullnameError] = useState("");
  // const [emailError, setEmailError] = useState("");
  // const [usernameError, setUsernameError] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

// const validateForm = (e) => {
//     e.preventDefault();

  //   if (fullname.trim() === "") {
  //     setFullnameError("Full name is required!");
  //   } else {
  //     setFullnameError("");
  //   }

  //   if (email.trim() === "") {
  //     setEmailError("Email is required!");
  //   } else {
  //     setEmailError("");
  //   }

  //   if (username.trim() === "") {
  //     setUsernameError("Username is required!");
  //   } else {
  //     setUsernameError("");
  //   }

  //   if (password.trim() === "") {
  //     setPasswordError("Password is required!");
  //   } else {
  //     setPasswordError("");
  //   }

  //   // Add more validation logic if needed

  //   if (
  //     fullnameError === "" &&
  //     emailError === "" &&
  //     usernameError === "" &&
  //     passwordError === ""
  //   ) {
  //     // Continue with form submission or other actions
  //     console.log(
  //       "Submitting form with fullname:",
  //       fullname,
  //       "email:",
  //       email,
  //       "username:",
  //       username,
  //       "and password:",
  //       password
  //     );
  //   }
  // };


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
    <div className="body">
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
