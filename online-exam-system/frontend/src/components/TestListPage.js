import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TestListPage() {
  const [tests, setTests] = useState([]);
  const [studentTest, setStudentTest] = useState([]);

    // Fetch available tests from the backend
    axios.get('http://localhost:5000/api/exam-attempts/availabletests')
      .then(response => {
        setTests(response.data);
      })
      .catch(error => console.error('Error fetching tests:', error));

    // Fetch tests the student has taken
    console.log(typeof localStorage.getItem("studentid"));
    axios.post('http://localhost:5000/api/student/tests',{
      studentId:localStorage.getItem("studentid")
    })
      .then(response => {
        setStudentTest(response.data.tests.map(test => test._id)); // Extract test IDs
      })
      .catch(error => console.error('Error fetching student tests:', error));

      console.log("studentTest",studentTest);
      console.log("tests",tests);

  return (
    <div className="container">
      <h1>Available Tests</h1>
      <ul>
        {tests.map(test => (
          <li key={test._id}>
            {studentTest.includes(test._id) ? ( // Check if test ID is in studentTest array
              <span>You have already attempted the test "{test.testName}"</span>
            ) : (
              <Link to={`/TestPage/${test._id}`}>{test.testName}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestListPage;
