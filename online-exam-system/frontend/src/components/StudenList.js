import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentList = ({ students }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>List of Students</h2>
      <ul>
        {students.map((student, index) => (
          <li onClick={()=>navigate(`/quizHistory/${student._id}`)} key={index}>{student.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
