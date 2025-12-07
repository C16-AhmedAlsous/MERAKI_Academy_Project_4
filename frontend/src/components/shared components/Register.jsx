import React, { useState } from "react";
import axios from "axios"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [message, setmessage] = useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="address"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="role"
        onChange={(e) => {
          setRole(e.target.value);
        }}
      />
      <button
        onClick={() => {
          const body = {
            name,
            email,
            password,
            address,
            role,
          }
          axios
            .post("http://localhost:5000/users/register", body)
            .then((res) => {
            
             setmessage(res.data.message)
            })
            .catch((err) => {
              setmessage(err.response.data.message);
            });
        }}
      >
        Register
      </button>
      <p>{message}</p>
    </div>
  );
};

export default Register;
