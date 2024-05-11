import React, { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./styles12.css";

const QuizForm = () => {
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState(['', '', '', '']);
  const [correctChoice, setCorrectChoice] = useState(null);

  const navigate = useNavigate();
  const params = useParams();
  const testName = params.testname;

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleChoiceChange = (index, event) => {
    const newChoices = [...choices];
    newChoices[index] = event.target.value;
    setChoices(newChoices);
  };

  const handleCorrectChoiceChange = (index) => {
    setCorrectChoice(index);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuestion('');
    setChoices(['', '', '', '']);
    setCorrectChoice(null);
  };

  const handleNextQuestion = () => {
    // Here you can send the current question details to the backend with a certain ID parameter to store in the database
    axios.post(`http://localhost:5000/api/test/enter-question-details`,{
      testName,
      question,
      choices,
      correctChoice
    })
    console.log('Storing question in the database:', { params,question, choices, correctChoice });
    // Clear the form fields after storing in the database
    setQuestion('');
    setChoices(['', '', '', '']);
    setCorrectChoice(null);
  };

  const handleFinalSubmit = () => {
    // Here you can send the final question details to the backend with a certain ID parameter to store in the database
    console.log('Finalizing question and storing in the database:', { question, choices, correctChoice });
    if(!question &&( !choices[0] || !choices[1] || !choices[2] || !choices[3])){
      alert("fill the fields properly")
    }else{
      axios.post(`http://localhost:5000/api/test/enter-question-details`,{
      testName,
      question,
      choices,
      correctChoice
    })
    alert('Thanks for adding the quiz questions!');
    navigate('/D');
    }
    // Display a thank you message for the admin
    
    
  };

  return (
    <div className="quiz-form-container">
      <h1>Create Quiz Question</h1>
      <form onSubmit={handleSubmit}>
        <label>Question:</label>
        <textarea value={question} onChange={handleQuestionChange} />

        <label>Choices:</label>
{choices.map((choice, index) => (
  <div key={index} className="choices-container">
    <input type="text" value={choice} onChange={(event) => handleChoiceChange(index, event)} />
    <input
      type="radio"
      value={index}
      checked={correctChoice === index}
      onChange={() => handleCorrectChoiceChange(index)}
    />
    <label className="correct-choice-label">Correct</label>
  </div>
))}
      </form>

      <button onClick={handleNextQuestion}>Next</button>
      <button onClick={handleFinalSubmit}>Submit Quiz</button>
    </div>
  );
};

export default QuizForm;
