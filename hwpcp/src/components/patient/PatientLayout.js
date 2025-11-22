import React,{useState} from 'react';
import { Link, Outlet,useNavigate } from 'react-router-dom';
import './PatientLayout.css';
import PatientRoutes from '../../routes/patient';


const PatientLayout = () => {
  const navigate=useNavigate();
  
  const[displayName,setDisplayName]=useState(localStorage.getItem('name'));
  
  return (
    <div className="patient-root">
      <aside className="patient-sidebar">
        <div className="brand">Healthcare Wellness</div>
        <nav className="nav">
          <ul>
            <li><Link to="/patient/dashboard">Dashboard</Link></li>
            <li><Link to="/patient/profile">My Profile</Link></li>
            <li><Link to="/patient/goals">Wellness Goals</Link></li>
            <li><Link to="/patient/messages">Messages</Link></li>
            <li><Link to="/logout" onClick={(e)=>{e.preventDefault();navigate('/')}}>Logout</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="patient-main">
        <header className="patient-header">Welcome, {displayName}</header>
        <section className="patient-content">
          <PatientRoutes></PatientRoutes>
        </section>
      </main>
    </div>
  );
};

export default PatientLayout;
