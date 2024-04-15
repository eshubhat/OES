import React from 'react';

function StudentDashboard() {
  const showAccountDetails = () => {
    document.getElementById('accountDetails').style.display = 'block';
    document.getElementById('attemptQuiz').style.display = 'none';
  };

  const showAttemptQuiz = () => {
    document.getElementById('accountDetails').style.display = 'none';
    document.getElementById('attemptQuiz').style.display = 'block';
    document.getElementById('attemptQuiz').classList.add('active'); // show Attempt Quiz section
  };

  const startQuiz = () => {
    // Implement quiz logic here (e.g., redirect to quiz page)
    alert('Starting Quiz...');
    // window.location.href = "/quiz";
  };

  const logout = () => {
    // Implement logout logic here (e.g., redirect to logout endpoint)
    alert('Logging out...');
    // window.location.href = "/logout";
  };

  return (
    <div className="container">
      <h1>Welcome, Student!</h1>

      {/* Navigation */}
      <nav>
        <ul>
          <li>
            <a href="#" onClick={showAccountDetails}>
              Account Details
            </a>
          </li>
          <li>
            <a href="#" onClick={showAttemptQuiz}>
              Attempt Quiz
            </a>
          </li>
        </ul>
      </nav>

      {/* Content Area */}
      <div className="content">
        {/* Account Details Section */}
        <div id="accountDetails">
          <h2>Account Details</h2>
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Email:</strong> johndoe@example.com
          </p>
          <img src="profile-picture.jpg" alt="Profile Picture" />
          <br />
          <br />
          <button onClick={logout}>Logout</button>
        </div>

        {/* Attempt Quiz Section */}
        <div id="attemptQuiz">
          <h2>Attempt Quiz</h2>
          <p>Ready to start?</p>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;