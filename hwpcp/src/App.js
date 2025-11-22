import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import PatientRoutes from './routes/patient';
import './App.css';
import PatientLayout from './components/patient/PatientLayout';
import Login from './components/Login';
import Signup from './components/register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login page shown by default */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />  
        {/* All patient pages wrapped in layout */}
        <Route path="/patient/*" element={<PatientLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
