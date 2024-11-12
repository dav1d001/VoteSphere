// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import VotingPage from './components/Votingpage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/vote" element={<VotingPage />} />
            </Routes>
        </Router>
    );
}

export default App;
