import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    const body = { name, email, password, address, role };
    axios
      .post("http://localhost:5000/users/register", body)
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Registration failed");
      });
  };

  return (
    <div className="page auth-page">
      <div className="form-card">
        <p className="eyebrow">Join the community</p>
        <h2>Create an account</h2>
        <div className="form-grid">
          <label>
            <span>Name</span>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <span>Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <span>Address</span>
            <input
              type="text"
              placeholder="City, street…"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label>
            <span>Role</span>
            <input
              type="text"
              placeholder="customer / admin"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </label>
          <button className="primary-btn" onClick={handleRegister}>
            Register
          </button>
        </div>
        {message && <p className="muted small">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
