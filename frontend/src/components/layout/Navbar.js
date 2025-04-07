import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const authLinks = (
    <>
      <li className="nav-item">
        <Link to='/books' className="nav-link" onClick={() => setIsMenuOpen(false)}>
          <i className="fas fa-book-open"></i> Books
        </Link>
      </li>
      <li className="nav-item">
        <Link to='/reservations' className="nav-link" onClick={() => setIsMenuOpen(false)}>
          <i className="fas fa-clipboard-list"></i> My Reservations
        </Link>
      </li>
      <li className="nav-item">
        <a onClick={onLogout} href='#!' className="nav-link">
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </li>
      {user && (
        <li className="nav-item user-greeting">
          <span>Hello, {user.name}</span>
        </li>
      )}
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-item">
        <Link to='/books' className="nav-link" onClick={() => setIsMenuOpen(false)}>
          <i className="fas fa-book-open"></i> Books
        </Link>
      </li>
      <li className="nav-item">
        <Link to='/register' className="nav-link" onClick={() => setIsMenuOpen(false)}>
          <i className="fas fa-user-plus"></i> Register
        </Link>
      </li>
      <li className="nav-item">
        <Link to='/login' className="nav-link" onClick={() => setIsMenuOpen(false)}>
          <i className="fas fa-sign-in-alt"></i> Login
        </Link>
      </li>
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to='/' className="navbar-logo">
          <i className="fas fa-book"></i> BookReserve
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;