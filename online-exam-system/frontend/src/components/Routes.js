import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register.js';
import Dashboard from './Dashboard.js';
import QuizForm from './QuizForm.js';
import Testrelated from './Testrelated.js'
import StudentDashboard from './Studentdashboard.js';
import TestPage from './TestPage.js';
import TestListPage from './TestListPage.js';
import QuizList from './QuizHistory.js';
import CorrectAnswersPage from './CorrectAnswerPage.js';
import ForgotPassword from "./ResetPasswordEmail.js"
import ForgotPasswordLink from './ResetPassword.js';

const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/D" element={<Dashboard />} />
            <Route path="/studentdashboard/:id" element={<StudentDashboard />} />
            <Route path="/QuizForm/:testname" element={<QuizForm />} />
            <Route path="/Testrelated" element={<Testrelated />} />
            <Route path="/testlistpage" element={<TestListPage />} />
            <Route path="/TestPage/:testid" element={<TestPage />} />
            <Route path="/QuizHistory/:studentId" element={<QuizList />} />
            <Route path="/correctanswerspage/:testid" element={<CorrectAnswersPage />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/reset-password/:studentid" element={<ForgotPasswordLink />} />

        </Routes>
    );
}

export default MyRoutes;
