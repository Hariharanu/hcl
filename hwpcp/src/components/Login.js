import './Login.css';
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import api from '../services/api';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email != "" && password != "") {
        const res = await api.post(`/auth/login`,{"email":email,"password":password});
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('name', res.data.name);
        console.log(res.data)
      navigate("/patient/dashboard");   // Redirect after login
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        {/* Placeholder Image */}
        <div className="image-placeholder">
          150 × 150
        </div>

        <h2 className="title">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">Login</button>
        </form>

        <a href="#" className="link">Forgot Password?</a>
        <Link to="register" className="link register" onClick={()=>navigate('/register')}>New User? Register here</Link>

      </div>
    </div>
  );
}

export default Login;
