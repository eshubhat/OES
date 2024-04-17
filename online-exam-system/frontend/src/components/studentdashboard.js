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
    fetchQuizHistory();
  }, []);

  const fetchStudentInfo = () => {
    // Fetch student information from the backend and update state
    // Example:
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
    // Fetch quiz history from the backend and update state
    // Example:
    // fetch('/api/student/quiz/history')
    //   .then(response => response.json())
    //   .then(data => setQuizHistory(data))
    //   .catch(error => console.error('Error fetching quiz history:', error));

    axios.get(`http://localhost:5000/api/student/tests/${params.id}`)
      .then((response) => {
       
        console.log(response.data.details);
        setQuizHistory(response.data.details.tests);
        setQuizScore(response.data.details.score)
        localStorage.setItem('studentid',params.id);
      })
      .catch(error => console.error('Error fetching student info:', error));
  };

  const startQuiz = () => {
    // Implement quiz logic here (e.g., redirect to quiz page)
    alert('Starting Quiz...');
    navigate('/testlistpage');
  };

  const logout = () => {
    // Implement logout logic here (e.g., redirect to logout endpoint)
    alert('Logging out...');
    localStorage.removeItem('studentid');
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Welcome, Student!</h1>

      {/* Navigation */}
      <nav>
        <ul>
          <li>
            <a href="#" className="nav-link" onClick={fetchStudentInfo}>
              Account Details
            </a>
          </li>
          <li>
            <a href="#" className="nav-link" onClick={fetchQuizHistory}>
              Quiz History
            </a>
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

        {/* Display Quiz History */}
        {quizHistory && (
          <div className="info-section">
            <h2>Quiz History</h2>
            <ul>
              {quizHistory.map((quiz, index) => (
                <li key={index}>
                  <p><strong>Quiz Name:</strong> {quiz.testName}</p>
                  {/* Add more details as needed */}
                </li>
              ))}
              {quizScore.map((quiz, index) => (
                <li key={index}>
                  <p><strong>Score:</strong> {quiz.score}</p>
                  {/* Add more details as needed */}
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
