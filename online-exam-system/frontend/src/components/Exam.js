import React, { useState, useEffect } from 'react';
import examService from '../services/examService';

const Exam = ({ match }) => {
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const examId = match.params.id;
        const fetchedExam = await examService.getExamById(examId);
        setExam(fetchedExam);
        // Initialize answers array based on number of questions in the exam
        setAnswers(new Array(fetchedExam.questions.length).fill(null));
      } catch (error) {
        console.error('Failed to fetch exam:', error);
      }
    };

    fetchExam();
  }, [match.params.id]);

  const handleAnswerSelection = (questionIndex, selectedOptionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedOptionIndex;
    setAnswers(updatedAnswers);
  };

  const handleSubmitExam = async () => {
    try {
      const examId = match.params.id;
      const submissionResult = await examService.submitExamAnswers(examId, answers);
      console.log('Exam submission result:', submissionResult);
      // Handle display of exam result (redirect or render result component)
    } catch (error) {
      console.error('Failed to submit exam:', error);
    }
  };

  if (!exam) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Render exam questions and options */}
      {exam.questions.map((question, index) => (
        <div key={question._id}>
          <p>{question.text}</p>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question${index}`}
                    value={optionIndex}
                    onChange={() => handleAnswerSelection(index, optionIndex)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {/* Submit button */}
      <button onClick={handleSubmitExam}>Submit Exam</button>
    </div>
  );
};

export default Exam;
