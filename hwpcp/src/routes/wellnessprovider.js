import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from '../components/provider/dashboard';
import MyProfile from '../components/provider/myprofile';
import Messages from '../components/provider/messages';
import Login from '../components/Login';

const ProviderRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="messages" element={<Messages />} />
    </Routes>
  );
};

export default ProviderRoutes;
