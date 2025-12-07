import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/shared components/Navbar";
import Login from "./components/shared components/Login";
import Register from "./components/shared components/Register";
import React, { createContext, useState } from "react";
import Home from "./components/shared components/Home";
import Search from "./components/shared components/search";
import About from "./components/shared components/About";
import Contact from "./components/shared components/Contact";
import AddProduct from "./components/shared components/addProduct";
import Carts from "./components/shared components/carts";

export const UserContext = createContext();
const App = () => {
  const [token, settoken] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(true);
  return (
    <UserContext.Provider
      value={{ token, settoken, isLoggedIn, setisLoggedIn }}
    >
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproduct" element={<AddProduct />} />
          <Route path="/carts" element={<Carts />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
