import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { UserContext } from "../../App";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const { isLoggedIn, setisLoggedIn } = useContext(UserContext);

  return (<div>
     <nav className="navbar">
      <p className="logo">E-commerce</p> || <Link to="/">Home</Link> ||{" "}
      <Link to="/about">About</Link> || <Link to="/contact">Contact</Link> ||{" "}
      <Link className="search-bar" to="/search">
        search
      </Link>{" "}
      || <br />
      {isLoggedIn ? (
        <div>
          <Button
            variant="primary"
            onClick={() => {
              setisLoggedIn(false);
              localStorage.removeItem("token");
            }}
          >
            LogOut
          </Button> || 
            <Link className="cart" to="/Carts">
            Carts
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/register">register</Link> || <Link to="/login">login</Link>
        </div>
      )}
      <Link to="/newproduct">AddProduct</Link>
    </nav>
  </div>
   
  );
};

export default Navbar;
