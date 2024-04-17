import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TestListPage() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    // Fetch available tests from the backend
    axios.get('http://localhost:5000/api/exam-attempts/availabletests')
      .then(response => {
        console.log(response.data)
        setTests(response.data);
      })
      .catch(error => console.error('Error fetching tests:', error));
  }, []);

  return (
    <div className="container">
      <h1>Available Tests</h1>
      <ul>
        {tests.map(test => (
          <li key={test._id}>
            <Link to={`/TestPage/${test._id}`}>{test.testName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestListPage;
