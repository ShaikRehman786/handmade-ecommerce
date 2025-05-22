import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import './product-css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 Desi Etsy. All rights reserved.</p>
      <div className="social-icons">
        <a href="#"><FaFacebookF /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaTwitter /></a>
        <a href="#"><FaLinkedin /></a>
      </div>
    </footer>
  );
};

export default Footer;
