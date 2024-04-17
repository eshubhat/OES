import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';

function Question({ question, onSelect }) {
  return (
    <div>
      <h2>{question.text}</h2>
      <ul>
        {question.options.map((options, index) => (
          <li key={index}>
            <input
              type="radio"
              name="option"
              value={index}
              onChange={() => onSelect(index)}
            />
            {options}
          </li>
        ))}
      </ul>
    </div>
  );
}

function NavigationButtons({ onNext, onPrevious }) {
  return (
    <div>
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
}

function SubmitButton({ onSubmit }) {
  return (
    <div>
      <button onClick={onSubmit}>Submit Test</button>
    </div>
  );
}

function TestPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [score, setScore] = useState(0);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    // Fetch questions from the backend
    axios.get(`http://localhost:5000/api/student/tests/${params.testid}`)
      .then(response => {
        setQuestions(response.data.questions);
        // Initialize responses array with default values
        setResponses(new Array(response.data.questions.length).fill(null));
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleNext = () => {
    if(currentQuestionIndex !== questions.length-1)
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);

  };

  const handlePrevious = () => {
    if(currentQuestionIndex !== 0)
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  const handleSelect = (choiceIndex) => {
    const newResponses = [...responses];
    newResponses[currentQuestionIndex] = choiceIndex;
    setResponses(newResponses);
  };

  const handleSubmit = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      const chosenOptionIndex = responses[index];
      if (chosenOptionIndex !== null && chosenOptionIndex !== undefined) {
        const correctOptionIndex = question.correctAnswerIndex;
        if (chosenOptionIndex === correctOptionIndex) {
          totalScore += 1; // Increment score for correct answer
        }
      }
    });
    setScore(totalScore);
    // Logic to submit test (send responses to backend)
    axios.post(`http://localhost:5000/api/student/result`,{
      testid:params.testid,
      studentid:localStorage.getItem('studentid'),
      totalScore
    })
    console.log('Responses:', responses);
    console.log('Total Score:', totalScore);
  };

  return (
    <div>
    {questions.length > 0 && (
      <Question
        question={questions[currentQuestionIndex]}
        onSelect={handleSelect}
      />
    )}
  
    <NavigationButtons
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  
    {currentQuestionIndex === questions.length - 1 && (
      <SubmitButton onSubmit={handleSubmit} />
    )}
  
    {score > 0 && (
      <div>
        <p>Total Score: {score}</p>
        <button onClick={()=>{navigate(`/studentdashboard/${localStorage.getItem('studentid')}`)}}>End Test</button>
      </div>
    )}
  </div>
  
  );
}


export default TestPage;
