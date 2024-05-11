import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Question({ question, onSelect }) {
  return (
    <div>
      <h2>{question.text}</h2>
      <ul>
        {question.options.map((option, index) => (
          <li key={index}>
            <input
              type="radio"
              name="option"
              value={index}
              onChange={() => onSelect(index)}
            />
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

function NavigationButtons({ onNext, onPrevious }) {
  return (
    <div className="navigation-buttons">
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
}

function SubmitButton({ onSubmit }) {
  return (
    <div className="submit-button">
      <button onClick={onSubmit}>Submit Test</button>
    </div>
  );
}


function TestPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(); // 60 minutes in seconds
  const [subject,setSubject] = useState();
  const [showCorrectAnswersModal, setShowCorrectAnswersModal] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    // Fetch questions from the backend
    axios.get(`http://localhost:5000/api/student/tests/${params.testid}`)
      .then(response => {
        setQuestions(response.data.questions.questions);
        setTimeLeft(response.data.questions.testTime * 60);
        setSubject(response.data.questions.subject)
        // Initialize responses array with default values
        setResponses(new Array(response.data.questions.length).fill(null));
      })
      .catch(error => console.error('Error fetching questions:', error));
  },[params.testid]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === 0) {
          clearInterval(timer);
          // Handle timeout logic here
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleNext = () => {
    if (currentQuestionIndex !== questions.length - 1)
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex !== 0)
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
    axios.post(`http://localhost:5000/api/student/result`, {
      testid: params.testid,
      studentid: localStorage.getItem('studentid'),
      totalScore
    });
    console.log(localStorage.getItem('studentid'));
    console.log('Total Score:', totalScore);
    setShowCorrectAnswersModal(true);
  };


  const handleGoToDashboard = () => {
    navigate(`/studentdashboard/${localStorage.getItem('studentid')}`);
  };

  const handleViewCorrectAnswers = () => {
    // Navigate to the page displaying correct answers
    navigate(`/correctanswerspage/${params.testid}`);
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`;
};

  return (
    <div className="container">
      {/* Modal to display options */}
      {showCorrectAnswersModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Test submitted successfully!</p>
            <p>Do you want to:</p>
            <button onClick={handleGoToDashboard}>Go to Dashboard</button>
            <button onClick={handleViewCorrectAnswers}>View Correct Answers</button>
          </div>
        </div>
      )}
      <p>subject: {subject}</p>
      <h3>{currentQuestionIndex+1}/{questions.length}</h3>
      <div className="timer">
        <p>Time Left: {formatTime(timeLeft)}</p>
      </div>
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

      {(currentQuestionIndex === questions.length - 1)&& (
        <div>
          <p>Total Score: {score}</p>
          <button onClick={() => { navigate(`/studentdashboard/${localStorage.getItem('studentid')}`) }}>End Test</button>
        </div>
      )}
    </div>
  );
}

export default TestPage;
