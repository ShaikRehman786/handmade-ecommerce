import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/product-css/Navbar.css';
import {
  FaHome,
  FaShoppingCart,
  FaUserShield,
  FaUserTie,
  FaSignInAlt,
  FaSignOutAlt,
  FaInfoCircle,
  FaTimes,
  FaBars
} from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
    window.location.reload(); 
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`custom-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link className="navbar-brand animated-brand" to="/">
          Desi <span>Etsy</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="menu-button" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link className="nav-link" to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <FaHome className="icon" /> Home
          </Link>

          <Link className="nav-link" to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
            <FaShoppingCart className="icon" /> Cart
          </Link>

          <Link className="nav-link" to="/aboutus" onClick={() => setIsMobileMenuOpen(false)}>
            <FaInfoCircle className="icon" /> About Us
          </Link>

          {userRole === 'artisan' && (
            <Link 
              className="nav-link" 
              to="/artisandashboard" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaUserTie className="icon" /> Artisan Dashboard
            </Link>
          )}

          {userRole === 'admin' && (
            <Link 
              className="nav-link" 
              to="/admin" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaUserShield className="icon" /> Admin Panel
            </Link>
          )}

          {userRole ? (
            <button 
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }} 
              className="nav-link login-btn btn-logout"
            >
              <FaSignOutAlt className="icon" /> Logout
            </button>
          ) : (
            <Link 
              className="nav-link login-btn" 
              to="/login" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaSignInAlt className="icon" /> ArtisanDashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;