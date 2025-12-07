import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
const Login = () => {
  const { token, settoken, isLoggedIn, setisLoggedIn } =
    useContext(UserContext);
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setmessage] = useState("");

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        onClick={() => {
          const body = {
            email: email,
            password: password,
          };
          axios
            .post("http://localhost:5000/users/login", body)
            .then((res) => {
              localStorage.setItem("token", res.data.token);
              setisLoggedIn(!res.data.success);
              setmessage(res.data.message);
              settoken(res.data.token);
            })
            .catch((err) => {
              setmessage(err.response.data.message);
            });
        }}
      >
        Login
      </button>
      <p>{message}</p>
      <p>{localStorage.getItem("token")}</p>
    </div>
  );
};

export default Login;
