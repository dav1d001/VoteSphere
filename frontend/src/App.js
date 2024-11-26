import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'; 
import CreateElectionPage from './pages/CreateElectionPage';
import CastVotePage from './pages/CastVotePage';
import ResultsPage from './pages/ResultsPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create-election" element={<CreateElectionPage />} />
        <Route path="/cast-vote" element={<CastVotePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/profile-settings" element={<ProfileSettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
