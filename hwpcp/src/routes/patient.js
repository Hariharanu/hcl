import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientLayout from '../components/patient/PatientLayout';

import Dashboard from '../components/patient/dashboard';
import MyProfile from '../components/patient/myprofile';
import WellnessGoals from '../components/wellnessgoals';
import Messages from '../components/patient/messages';
import Login from '../components/Login';

const PatientRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="goals" element={<WellnessGoals />} />
        <Route path="messages" element={<Messages />} />
    </Routes>
  );
};

export default PatientRoutes;
