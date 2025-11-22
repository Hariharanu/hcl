import React from 'react';
import './App.css';

import Login from './components/login';
import Signup from './components/signup';
import Request from './components/request';

function App() {
  return (
    <div className="App">
       
        <Signup />
        <Request />
       
    </div>
  );
}

export default App;
