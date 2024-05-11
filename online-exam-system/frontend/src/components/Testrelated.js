import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Test.css'; // Import CSS file for styling

const Test = () => {
  const [testName, setTestName] = useState('');
  const [testTime, setTestTime] = useState(''); // State for test time
  const [subject, setSubject] = useState(''); // State for subject
  const [testCreated, setTestCreated] = useState(false); // State to track if test is created
  const navigate = useNavigate();

  const handleTestNameChange = (event) => {
    setTestName(event.target.value);
  };

  const handleTestTimeChange = (event) => {
    setTestTime(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleAddQuestions = () => {
    navigate(`/QuizForm/${testName}`);
  };

  const handleCreateTest = () => {
    if (testName.trim() !== '') {
      setTestCreated(true);
    }

    axios.post("http://localhost:5000/api/test/create-test",{
      testName,
      testTime, // Send test time to the server
      subject // Send subject to the server
    }).then((res)=>{
      if(res.data?.message){
        setTestCreated(false)
        setTimeout(()=>{
          alert(res.data?.message);
        },500)
      }
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
        <label>Test Time (in min):</label> {/* Add label for test time */}
        <input type="text" value={testTime} onChange={handleTestTimeChange} /> {/* Input field for test time */}
      </div>
      <div className="form-group">
        <label>Subject:</label> {/* Add label for subject */}
        <input type="text" value={subject} onChange={handleSubjectChange} /> {/* Input field for subject */}
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
