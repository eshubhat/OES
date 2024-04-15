import React from 'react';
import "./Dashboard.css";

const Dashboard = () => {
  const displayContent = (content) => {
    console.log(`Displaying content: ${content}`);
  };

  const logout = () => {
    console.log('Logging out...');
  };

  return (
    <>
    <div className="dashboard-container">
      <header>
        <div className="container">
          <h1>Welcome Admin/Teacher</h1>
        </div>
      </header>
      <div className="main-content">
        <h2>Main Content Area</h2>
        <p id="dashboard-content">This is where your dashboard content will be displayed.</p>
      </div>
      <div className="sidebar" id="sidebar">
        <nav>
          <ul>
            <li><a href="/QuizForm" onClick={() => displayContent('createQuiz')}>Create Quiz</a></li>
            <li><a href="#" onClick={(displayContent) => displayContent('accountDetails')}>Account Details</a></li>
            <li><a href="/Login" onClick={logout}>Logout</a></li>
          </ul>
        </nav>
      </div>
    </div>
    </>
  );
};

export default Dashboard;