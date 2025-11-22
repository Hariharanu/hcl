import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientLayout from '../components/PatientLayout';
import Dashboard from '../components/dashboard';
import MyProfile from '../components/myprofile';
import WellnessGoals from '../components/wellnessgoals';
import Messages from '../components/messages';

const PatientRoutes = () => {
  return (
    <Routes>
      <Route path="/patient" element={<PatientLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="goals" element={<WellnessGoals />} />
        <Route path="messages" element={<Messages />} />
      </Route>
    </Routes>
  );
};

export default PatientRoutes;
