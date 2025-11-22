import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PatientRoutes from './routes/patient';
import './App.css';
import PatientLayout from './components/PatientLayout';

function App() {
  return (
    <Router>
      <PatientLayout></PatientLayout>
      <PatientRoutes />
    </Router>
  );
}

export default App;
