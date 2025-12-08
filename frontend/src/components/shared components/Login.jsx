import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { parseToken } from "../../utils/parseToken";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setToken, setIsLoggedIn, setUserRole, setIsAdmin } =
    useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const body = { email, password };
    axios
      .post("http://localhost:5000/users/login", body)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setIsLoggedIn(true);
        setMessage(res.data.message);
        setToken(res.data.token);
        const payload = parseToken(res.data.token);
        const roleType = payload?.type || "";
        setUserRole(roleType);
        setIsAdmin(roleType?.toLowerCase() === "admin");
        navigate('/');      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Login failed");
      });
  };

  return (
    <div className="page auth-page">
      <div className="form-card">
        <p className="eyebrow">Welcome back</p>
        <h2>Login</h2>
        <div className="form-grid">
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
          <button className="primary-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
        {message && <p className="muted small">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
