import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { UserContext } from "../../App";
const Navbar = () => {
  const { isLoggedIn, setisLoggedIn } = useContext(UserContext);

  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <p>E-commerce</p> || <Link to="/">Home</Link> ||{" "}
      <Link to="/about">About</Link> || <Link to="/contact">Contact</Link> ||{" "}
      <Link to="/search">search</Link> || <br />
      {isLoggedIn ? (
        <button
          onClick={() => {
            setisLoggedIn(false);
            localStorage.removeItem("token");
          }}
        >
          LogOut
        </button>
      ) : (
        <div>
          <Link to="/register">register</Link> || <Link to="/login">login</Link>
        </div>
      )}
      <Link to="/newproduct">AddProduct</Link>
      <Link to="/Carts">Carts</Link>
    </div>
  );
};

export default Navbar;
