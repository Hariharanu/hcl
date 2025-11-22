import '../../App.css'
import React,{useEffect, useState} from 'react';

import api from '../../services/api';



const Dashboard = () => {
  const[patients,setPatients]=useState([]);

  useEffect(()=>{
    fetchData();
  },[]);
//fetching patient list
async function fetchData(){
    try {
      const res = await api.get('/provider/getAllPatient');
      setPatients(res.data.patients);
      console.log(res.data);
    } catch(err){ console.log(err) }
  }


  return (
    <div>
      <h2>My Patient List</h2>
      <hr />
       <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '12px'
    }}>
      <thead>
        <tr style={{ background: '#f2f2f2' }}>
          <th style={{ padding: 8, textAlign: 'left' }}>Name</th>
          <th style={{ padding: 8, textAlign: 'left' }}>Email</th>
          <th style={{ padding: 8, textAlign: 'left' }}>Weight</th>
          <th style={{ padding: 8, textAlign: 'left' }}>Bp</th>
        </tr>
      </thead>

      <tbody>
        {patients.map((patient) => (
          <tr key={patient._id} style={{ borderBottom: '1px solid #e0e0e0' }}>
            <td style={{ padding: 8 }}>{patient.name}</td>
            <td style={{ padding: 8 }}>{patient.email}</td>
            <td style={{ padding: 8 }}>{patient.weight} yrs</td>
            <td style={{ padding: 8 }}>{patient.bp}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Dashboard;
