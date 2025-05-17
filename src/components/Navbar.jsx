import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/product-css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const userRole = localStorage.getItem('userRole');

  // Optional: logout button to clear role and redirect
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
    window.location.reload(); 
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">Desi Etsy</Link>
        <div className="nav-links">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/cart">Cart</Link>

          {/* Show Admin link only if userRole is 'artisan' */}
          {userRole === 'artisan' && (
            <Link className="nav-link" to="/admin">Admin</Link>
          )}

          {/* Show Login/Logout depending on login status */}
          {userRole ? (
            <button onClick={handleLogout} className="nav-link login-btn btn-logout">
              Logout
            </button>
          ) : (
            <Link className="nav-link login-btn" to="/login">Login / Sign Up</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
