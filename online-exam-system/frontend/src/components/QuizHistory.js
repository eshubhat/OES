import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './QuizList.css'; // Import CSS file for styling
import axios from 'axios';

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [score, setScore] = useState([]);
  const [averageScores, setAverageScores] = useState([]);
  const params = useParams();

  useEffect(() => {
    axios.post(`http://localhost:5000/api/student/tests`, {
      studentId: params.studentId
    })
    .then((response) => {
      console.log(response.data)
      setQuizzes(response.data.tests);
      setScore(response.data.score);
    })
    .catch(error => {
      console.error('Error fetching quiz list:', error);
      // Handle error - Show a user-friendly error message
    });
  }, [params.studentId]); // Add params.studentId to the dependency array

  useEffect(()=>{
    const calculateAverageScores = () => {
      const avgScoresDetails = {
        subjects: [],
        totalScores: [],
        totalTests: []
      };
    
      // Calculate total scores and total tests for each subject
      quizzes.forEach((quiz, index) => {
        const subjectIndex = avgScoresDetails.subjects.indexOf(quiz.subject);
        const scoreValue = score[index] && score[index].score ? score[index].score : 0; // Safely access score
        if (subjectIndex === -1) {
          avgScoresDetails.subjects.push(quiz.subject);
          avgScoresDetails.totalScores.push(scoreValue);
          avgScoresDetails.totalTests.push(1);
        } else {
          avgScoresDetails.totalScores[subjectIndex] += scoreValue;
          avgScoresDetails.totalTests[subjectIndex]++;
        }
      });
    
      // Calculate average score for each subject
      const averages = avgScoresDetails.subjects.map((subject, index) => {
        return {
          subject: subject,
          average: avgScoresDetails.totalScores[index] / avgScoresDetails.totalTests[index]
        };
      });
    
      setAverageScores(averages);
    };
    calculateAverageScores();

  },[score])

  

  const createQuizRows = () => {
    if (quizzes && quizzes.length > 0) {
      return quizzes.map((quiz, index) => (
        <tr key={index}>
          <td>{quiz.testName}</td>
          <td>{score && score.length > index && score[index] ? score[index].score : 'N/A'}</td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td colSpan="2">No quizzes available</td>
        </tr>
      );
    }
  };

  const createAverageScoreRows = () => {
    return averageScores.map((avg, index) => (
      <tr key={index}>
        <td>{avg.subject}</td>
        <td>{avg.average.toFixed(2)}</td>
      </tr>
    ));
  };

  return (
    <div className="tables-container">
      <div className="quiz-list-container">
        <h1 className="quizHistoryHeader">Quiz List</h1>
        <table className="quiz-table">
          <thead>
            <tr>
              <th>Quiz Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {createQuizRows()}
          </tbody>
        </table>
      </div>
      <div className="average-scores-container">
        <h1>Average Scores</h1>
        <table className="average-score-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Average Score</th>
            </tr>
          </thead>
          <tbody>
            {createAverageScoreRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuizList;
