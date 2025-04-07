import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home-container'>
      <h1>Welcome to BookReserve</h1>
      <p>
        A simple and efficient digital library system that allows students to browse 
        and reserve books within specified dates. Manage your reading materials with ease.
      </p>

      <div className="card-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="card">
          <h3><i className="fas fa-search"></i> Browse Books</h3>
          <p>Explore our collection of academic and literary books available in our digital library.</p>
          <Link to='/books' className='btn btn-primary'>
            View Books
          </Link>
        </div>

        <div className="card">
          <h3><i className="fas fa-calendar-alt"></i> Reserve Books</h3>
          <p>Reserve books for specific dates to ensure availability when you need them.</p>
          <Link to='/login' className='btn btn-primary'>
            Start Reserving
          </Link>
        </div>

        <div className="card">
          <h3><i className="fas fa-user"></i> Create Account</h3>
          <p>Register now to start reserving books and manage your borrowing history.</p>
          <div className="buttons">
            <Link to='/register' className='btn btn-primary'>
              Register
            </Link>
            <Link to='/login' className='btn'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;