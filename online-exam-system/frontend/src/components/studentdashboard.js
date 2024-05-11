import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './StudentDashboard.css'; // Import CSS file for styling

function StudentDashboard() {
  const [studentInfo, setStudentInfo] = useState(null);
  const [quizHistory, setQuizHistory] = useState(null);
  const [quizScore, setQuizScore] = useState(null);

const navigate = useNavigate()

  const params = useParams();

  // Fetch student information and quiz history when component mounts
  useEffect(() => {
    fetchStudentInfo();
    // fetchQuizHistory();
  }, []);

  const fetchStudentInfo = () => {
    // Fetch student information from the backend and update state
    // Example:
    if(!params.id){
      alert("Please login first/Register your self!");
      navigate("/");
    }
    console.log(params.id)
    axios.get(`http://localhost:5000/api/student/${params.id}`)
      .then((response) => {
        const data = {
          username:response.data.username,
          email: response.data.email,
          role: response.data.role
        }

        setStudentInfo(data);
      })
      .catch(error => console.error('Error fetching student info:', error));
  };

  const fetchQuizHistory = () => {

    navigate(`/quizHistory/${localStorage.getItem('studentid')}`);
  };

  const startQuiz = () => {
    alert('Starting Quiz...');
    navigate('/testlistpage');
  };

  const logout = () => {
    alert('Logging out...');
    localStorage.removeItem('studentid');
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Welcome, Student!</h1>

      <nav>
        <ul>
          <li>
            <a href="#" className="nav-link" onClick={fetchStudentInfo}>
              Account Details
            </a>
          </li>
          <li>
  <button className="nav-link" onClick={fetchQuizHistory}>
    Quiz Analysis
  </button>
</li>
        </ul>
      </nav>

      {/* Content Area */}
      <div className="content">
        {/* Display Student Information */}
        {studentInfo && (
          <div className="info-section">
            <h2>Account Details</h2>
            <p><strong>Name:</strong> {studentInfo.username}</p>
            <p><strong>Email:</strong> {studentInfo.email}</p>
            <br />
            <br />
            <button onClick={logout}>Logout</button>
          </div>
        )}

        {quizHistory && (
          <div className="info-section">
            <h2>Quiz Analysis</h2>
            <ul>
              {quizHistory.map((quiz, index) => (
                <li key={index}>
                  <p><strong>Quiz Name:</strong> {quiz.testName}</p>

                </li>
              ))}
              {quizScore.map((quiz, index) => (
                <li key={index}>
                  <p><strong>Score:</strong> {quiz.score}</p>

                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Attempt Quiz Section */}
        <div className="info-section">
          <h2>Attempt Quiz</h2>
          <p>Ready to start?</p>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
