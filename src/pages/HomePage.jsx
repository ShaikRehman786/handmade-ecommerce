import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/product-css/Navbar.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
    window.location.reload(); 
  };

  return (
    <>
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

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <h3>Desi Etsy</h3>
          <p>Celebrating Indian craftsmanship through curated artisan products.</p>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
          <p className="copyright">
            © {new Date().getFullYear()} Desi Etsy. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Navbar;
