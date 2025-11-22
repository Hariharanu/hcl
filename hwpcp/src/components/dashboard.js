import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h2>Wellness Goals</h2>
      <div style={{ display: 'flex', gap: 12, flexDirection: 'column', maxWidth: 600 }}>
        <div style={{ background: 'white', padding: 16, borderRadius: 8 }}>Steps card (mock)</div>
        <div style={{ background: 'white', padding: 16, borderRadius: 8 }}>Active time card (mock)</div>
        <div style={{ background: 'white', padding: 16, borderRadius: 8 }}>Sleep card (mock)</div>
      </div>
    </div>
  );
};

export default Dashboard;
