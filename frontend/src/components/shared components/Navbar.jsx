import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Navbar = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setUserRole,
    setIsAdmin,
    isAdmin,
    theme,
    toggleTheme,
  } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="navbar">
      <div className="nav-left">
        <Link className="logo" to="/">
          ELECTRIC Shop
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/search">Search</Link>
        </div>
      </div>

      <div className="nav-right">
        <button className="pill" onClick={toggleTheme}>
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
        {isLoggedIn ? (
          <>
            <div className="user-menu" >
              <button
                className="secondary-btn user-toggle"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                Account ▾
              </button>
              {menuOpen && (
                <div className="dropdown">
                  <Link to="/carts" onClick={() => setMenuOpen(false)}>
                    View cart
                  </Link>
                  <button
                    className="ghost-btn"
                    onClick={() => {
                      setIsLoggedIn(false);
                      localStorage.removeItem("token");
                      setUserRole("");
                      setIsAdmin(false);
                      setMenuOpen(false);
                    }}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link className="pill" to="/register">
              Register
            </Link>
            <Link className="secondary-btn" to="/login">
              Log in
            </Link>
          </>
        )}
        {isAdmin && (
          <Link className="primary-btn" to="/newproduct">
            Add Product
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
