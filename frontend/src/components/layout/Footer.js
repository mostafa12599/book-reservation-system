import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>BookReserve</h3>
          <p>Your digital library reservation system for students</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/books">Browse Books</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Help</h3>
          <ul className="footer-links">
            <li><a href="#!">How to Reserve</a></li>
            <li><a href="#!">FAQ</a></li>
            <li><a href="#!">Contact Us</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {year} BookReserve. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;