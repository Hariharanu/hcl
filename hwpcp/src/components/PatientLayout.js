import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './PatientLayout.css';

const PatientLayout = () => {
  return (
    <div className="patient-root">
      <aside className="patient-sidebar">
        <div className="brand">Health</div>
        <nav className="nav">
          <ul>
            <li><Link to="">Dashboard</Link></li>
            <li><Link to="profile">My Profile</Link></li>
            <li><Link to="goals">Wellness Goals</Link></li>
            <li><Link to="messages">Messages</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="patient-main">
        <header className="patient-header">Welcome, David</header>
        <section className="patient-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default PatientLayout;
