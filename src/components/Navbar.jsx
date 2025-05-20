import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/product-css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const userRole = localStorage.getItem('userRole');

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

          {userRole === 'artisan' && (
            <Link className="nav-link" to="/artisan/dashboard">Artisan Dashboard</Link>
          )}

          {userRole === 'admin' && (
            <Link className="nav-link" to="/admin">Admin Panel</Link>
          )}

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
