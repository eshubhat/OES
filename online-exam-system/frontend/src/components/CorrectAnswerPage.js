import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function CorrectAnswersPage() {
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const params = useParams();

  useEffect(() => {
    // Fetch correct answers from the backend
    axios.get(`http://localhost:5000/api/student/tests/${params.testid}`)
      .then(response => {
        console.log(response.data.questions)
        setCorrectAnswers(response.data.questions.questions);
      })
      .catch(error => console.error('Error fetching correct answers:', error));
  }, [params.testid]);

  return (
    <div className="container">
      <h2>Correct Answers</h2>
      <ul>
        {console.log(typeof correctAnswers)}
        {correctAnswers.map((question, index) => (
          <li key={index}>
            <p>{question.text}</p>
            <p>Correct Answer: {question.correctAnswerIndex+1}. {question.options[question.correctAnswerIndex]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
