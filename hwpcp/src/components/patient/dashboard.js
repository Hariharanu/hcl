import '../../App.css'
import React,{useEffect, useState} from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import api from '../../services/api';


function SleepSegments({ segments }){
// segments: [{color, widthPercent}]
return (
<div className="sleep-segments">
{segments.map((s,i)=> (
<div key={i} className="sleep-seg" style={{flex: s.widthPercent, background: s.color}} />
))}
</div>
);
}

function StepsChart({ data }){
return (
<ResponsiveContainer width="100%" height={60}>
<BarChart data={data} margin={{top:0,right:0,left:0,bottom:0}}>
<XAxis dataKey="time" hide />
<YAxis hide />
<Tooltip />
<Bar dataKey="steps" barSize={8} radius={[4,4,4,4]} fill="#f6b2b2" />
</BarChart>
</ResponsiveContainer>
);
}

function ActiveTimeDonut({ value, max }){
const percent = Math.round((value/max)*100);
const data = [
{ name: 'active', value: value },
{ name: 'rest', value: Math.max(max - value, 0) }
];
const COLORS = ['#ff7b81', '#e9ecef'];
return (
<div style={{display:'flex',alignItems:'center',gap:16}}>
<ResponsiveContainer width={120} height={120}>
<PieChart>
<Pie data={data} innerRadius={36} outerRadius={54} dataKey="value" startAngle={90} endAngle={-270}>
{data.map((entry, index) => (
<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
))}
</Pie>
</PieChart>
</ResponsiveContainer>
<div style={{textAlign:'center'}}>
<div style={{fontSize:24,fontWeight:700}}>{value}</div>
<div style={{color:'#666'}}> / {max} mins</div>
</div>
</div>
);
}

function WellnessCard({ title, children }){
return (
<div className="wellness-card">
<div className="wc-title">{title}</div>
<div className="wc-body">{children}</div>
</div>
);
}

const Dashboard = () => {
const [stepsData, setStepsData] = useState([]);
const [goals, setGoals] = useState([]);
const[providers, setProviders] = useState([]);

//fetching wellness providers list
async function fetchData(){
    try {
      const res = await api.get('/patient/getAllProvider');
      setProviders(res.data.providers);
      console.log(res.data);
    } catch(err){ console.log(err) }
  }

//assing provider to patient
async function assignProviderToPatient(providerId){
    try {
      const res = await api.put(`/patient/assign/${providerId}`);
      console.log(res.data);
      alert('Provider assigned successfully');
    } catch(err){ console.log(err) }
  }

useEffect(()=>{
const mock = [
{time:'6', steps:100}, {time:'7', steps:180}, {time:'8', steps:240}, {time:'9', steps:200},
{time:'10', steps:320}, {time:'11', steps:220}, {time:'12', steps:300}, {time:'13', steps:120},
{time:'14', steps:60}, {time:'15', steps:400}, {time:'16', steps:600}, {time:'17', steps:140},
{time:'18', steps:700}, {time:'19', steps:300}
];
setStepsData(mock);
fetchData()
},[]);

const stepGoal = 8000;
const current = 3620;
const percent = Math.round((current/stepGoal)*100);

  return (
    <div>
      <h2>My Wellness Goals</h2>
      <div style={{
  display: 'flex',
  gap: '20px',
  alignItems: 'flex-start'
}}>
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '60%',
    maxWidth: '600px'
  }}>
        <div style={{ background: 'white', padding: 16, borderRadius: 8 }}>
          <div className="mini-chart">
            <WellnessCard title="Steps">
<div className="steps-top">
<div>
<div className="steps-label">Steps</div>
<div className="steps-count"><strong>{current}</strong> / {stepGoal} steps</div>
</div>
<div className="mini-chart"><StepsChart data={stepsData} /></div>
</div>
<div className="steps-bar mt-8">
<div className="bar-track">
<div className="bar-fill" style={{width: percent + '%'}}>{percent}%</div>
</div>
</div>
            </WellnessCard>
          </div>
        </div>
        <div style={{ background: 'white', padding: 16, borderRadius: 8 }}>
        <WellnessCard title="Active Time">
<div className="active-row">
<ActiveTimeDonut value={56} max={60} />
</div>
<div className="meta mt-8">1712 Kcal | 1.23km</div>
</WellnessCard>
          </div>
        <div style={{ background: 'white', padding: 16, borderRadius: 8 }}>
          <WellnessCard title="Sleep">
<div className="sleep-row">
<div className="sleep-times">11:30 pm<br/><small>06:00 am</small></div>
<div className="sleep-duration"><strong>6 hrs 30 mins</strong></div>
</div>
<div className="mt-8">
<SleepSegments segments={[
{color:'#f7a07a', widthPercent:1},
{color:'#ffd57e', widthPercent:1},
{color:'#9ae6b4', widthPercent:1},
{color:'#7fd3f4', widthPercent:1},
]} />
</div>
</WellnessCard>
        </div>
      </div>
      <div style={{
    width: '50%',
    background: 'white',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0px 2px 6px rgba(0,0,0,0.06)'
  }}>
        <h3>Wellness Providers</h3>
    <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '12px'
    }}>
      <thead>
        <tr style={{ background: '#f2f2f2' }}>
          <th style={{ padding: 8, textAlign: 'left' }}>Name</th>
          <th style={{ padding: 8, textAlign: 'left' }}>Email</th>
          <th style={{ padding: 8, textAlign: 'left' }}>Experience</th>
          <th style={{ padding: 8, textAlign: 'left' }}>Specialization</th>
          <th style={{ padding: 8, textAlign: 'left' }}>Assign my Provider</th>
        </tr>
      </thead>

      <tbody>
        {providers.map((provider) => (
          <tr key={provider._id} style={{ borderBottom: '1px solid #e0e0e0' }}>
            <td style={{ padding: 8 }}>{provider.name}</td>
            <td style={{ padding: 8 }}>{provider.email}</td>
            <td style={{ padding: 8 }}>{provider.exprience} yrs</td>
            <td style={{ padding: 8 }}>{provider.specialization}</td>
            <td style={{ padding: 8 }}>
              <button onClick={()=>assignProviderToPatient(provider._id)}
  style={{
    background: "#ff7b81",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
  }}
>
  Assign
</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
