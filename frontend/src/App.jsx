import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/shared components/Navbar";
import Login from "./components/shared components/Login";
import Register from "./components/shared components/Register";
import React, { createContext, useEffect, useState } from "react";
import Home from "./components/shared components/Home";
import Search from "./components/shared components/Search";
import About from "./components/shared components/About";
import Contact from "./components/shared components/Contact";
import AddProduct from "./components/shared components/AddProduct";
import Carts from "./components/shared components/Carts";
import ProductDetails from "./components/shared components/ProductDetails";
import Success from "./components/shared components/Success";
import { parseToken } from "./utils/parseToken";

export const UserContext = createContext();
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [userRole, setUserRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      const payload = parseToken(storedToken);
      const roleType = payload?.type || "";
      setUserRole(roleType);
      setIsAdmin(roleType?.toLowerCase() === "admin");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
        userRole,
        setUserRole,
        isAdmin,
        setIsAdmin,
      }}
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
          <Route path="/success" element={<Success />} />
          <Route
            path="/ProductDetails/:productid"
            element={<ProductDetails />}
          />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
