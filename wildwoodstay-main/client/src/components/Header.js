import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-icon">🏔️</span>
            <span className="logo-text">The Wildwood Stay</span>
          </Link>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`nav ${menuOpen ? "active" : ""}`}>
          <div className="nav-links">
            <Link to="/cabins" onClick={() => setMenuOpen(false)}>
              Cabins
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/guest-area" onClick={() => setMenuOpen(false)}>
                  Guest area
                </Link>
                <div className="user-menu">
                  <button className="user-button">
                    <FaUser /> {user?.name || "User"}
                  </button>
                  <div className="dropdown-menu">
                    {user?.role === "admin" && (
                      <Link to="/admin" onClick={() => setMenuOpen(false)}>
                        Admin Dashboard
                      </Link>
                    )}
                    <Link to="/my-bookings" onClick={() => setMenuOpen(false)}>
                      My Bookings
                    </Link>
                    <Link
                      to="/profile-settings"
                      onClick={() => setMenuOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
