import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register.js';
import Dashboard from './Dashboard.js';
import QuizForm from './QuizForm.js';

const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/D" element={<Dashboard />} />
            <Route path="/QuizForm" element={<QuizForm />} />
        </Routes>
    );
}

export default MyRoutes;
