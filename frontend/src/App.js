import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/routing/PrivateRoute';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import BookList from './components/books/BookList';
import ReservationList from './components/reservations/ReservationList';
import MakeReservation from './components/reservations/MakeReservation';

import './App.css';

const App = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/a076d05399.js';
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/books" element={<BookList />} />
              <Route 
                path="/reservations" 
                element={
                  <PrivateRoute>
                    <ReservationList />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/reserve/:bookId" 
                element={
                  <PrivateRoute>
                    <MakeReservation />
                  </PrivateRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;