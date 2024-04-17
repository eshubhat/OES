import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Test.css'; // Import CSS file for styling

const Test = () => {
  const [testName, setTestName] = useState('');
  const [testCreated, setTestCreated] = useState(false); // State to track if test is created
  const navigate = useNavigate();

  const handleTestNameChange = (event) => {
    setTestName(event.target.value);
  };

  const handleAddQuestions = () => {
    navigate(`/QuizForm/${testName}`);
  };

  const handleCreateTest = () => {
    if (testName.trim() !== '') {
      setTestCreated(true);
    }

    axios.post("http://localhost:5000/api/test/create-test",{
      testName
    })

  };

  return (
    <div className="create-test-container">
      <h2>Create Test</h2>
      <div className="form-group">
        <label>Test Name:</label>
        <input type="text" value={testName} onChange={handleTestNameChange} />
      </div>
      <div className="form-group">
        <button className="create-test-btn" onClick={handleCreateTest}>Create Test</button>
      </div>
      {testCreated && (
        <div className="form-group">
          <button className="add-questions-btn" onClick={handleAddQuestions}>Add Questions</button>
        </div>
      )}
    </div>
  );
};

export default Test;
