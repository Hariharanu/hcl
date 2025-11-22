import React, { useState } from "react";

 function Register({ role }) {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    weight: "",
    bp: "",
    exp: "",
    specialization: "",
    role: role,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role,
          age: formData.age,
          weight: formData.weight,
          bp: formData.bp,
          exp: formData.exp,
          specialization: formData.specialization,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Registration successful!");
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {role === "PATIENT" && (
        <>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="bp"
            placeholder="BP"
            value={formData.bp}
            onChange={handleChange}
            required
          />
        </>
      )}

      {role === "PROVIDER" && (
        <>
          <input
            type="number"
            name="exp"
            placeholder="Experience (Years)"
            value={formData.exp}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          />
        </>
      )}

      <button type="submit">Register</button>

      {message && <div className="alert">{message}</div>}
    </form>
  );
}

export default function Signup() {
  const [role, setRole] = useState("");

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h3 className="title">Welcome to Health and Wellness</h3>
        <hr />
        <h3>Register</h3>
        <hr />
        <div className="radio-group">
          <label>
            Doctor
            <input
              type="radio"
              name="wellness"
              value="PROVIDER"
              onChange={handleRole}
            />
          </label>
          <label>
            Patient
            <input
              type="radio"
              name="wellness"
              value="PATIENT"
              onChange={handleRole}
            />
          </label>
        </div>

        {role && <Register role={role} />}
      </div>
    </div>
  );
}
