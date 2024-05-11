import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentList from './StudenList.js'; // Import the StudentList component
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [facultyInfo,setFacultyInfo] = useState({});

  const fetchFacultyInfo = () => {
    // Fetch student information from the backend and update state
    // Example:
    axios.get(`http://localhost:5000/api/student/${localStorage.getItem("adminid")}`)
      .then((response) => {
        const data = {
          username:response.data.username,
          email: response.data.email,
          role: response.data.role
        }

        setFacultyInfo(data);
      })
      .catch(error => console.error('Error fetching student info:', error));
  };
  fetchFacultyInfo();

  useEffect(() => {
    // Fetch student information from the backend
    axios.post("http://localhost:5000/api/student/students")
      .then(res => setStudentInfo(res.data.user));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStudents = studentInfo.filter(student =>
    student.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayContent = (content) => {
    if (content === 'createQuiz') {
      navigate('/Testrelated');
    } else if (content === 'accountDetails') {
      navigate('/accountDetails'); // Assuming '/accountDetails' is the route for displaying account details
    }
  };

  const logout = () => {
    localStorage.removeItem('adminid');
    alert('Logging out...');
    navigate('/');
  };

  return (
    <>
      <div className="dashboard-container">
        <header>
          <div className="container">
            <h1>Welcome Admin/Teacher</h1>
            {/* Display student information */}
            {studentInfo && (
              <div>
                <p className='p1'><strong>Name:</strong> {facultyInfo.username}</p>
                <p className='p1'><strong>Email:</strong> {facultyInfo.email}</p>
                <p className='p1'><strong>Role:</strong> {facultyInfo.role}</p>
              </div>
            )}
          </div>
        </header>
        <div className="main-content">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search Students..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <StudentList students={filteredStudents} /> {/* Render the filtered student list */}
        </div>
        <div className="sidebar" id="sidebar">
          <nav>
            <ul>
              <li><a onClick={() => displayContent('createQuiz')}>Create Quiz</a></li>
              <li><a onClick={logout}>Logout</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
