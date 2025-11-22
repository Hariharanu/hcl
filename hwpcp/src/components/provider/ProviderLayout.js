import React,{useState} from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import './ProviderLayout.css';
import PatientRoutes from '../../routes/patient';
import ProviderRoutes from '../../routes/wellnessprovider';

const PatientLayout = () => {
  const[displayName,setDisplayName]=useState(localStorage.getItem('name'));
  const navigate=useNavigate();
  return (
    <div className="patient-root">
      <aside className="patient-sidebar">
        <div className="brand">Healthcare Wellness</div>
        <nav className="nav">
          <ul>
            <li><Link to="/provider/dashboard">Dashboard</Link></li>
            <li><Link to="/provider/profile">My Profile</Link></li>
            <li><Link to="/provider/messages">Messages</Link></li>
            <li><Link to="/logout" onClick={()=>navigate('/')}>Logout</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="patient-main">
        <header className="patient-header">Welcome, {displayName}</header>
        <section className="patient-content">
          <ProviderRoutes></ProviderRoutes>
        </section>
      </main>
    </div>
  );
};

export default PatientLayout;
