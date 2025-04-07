import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MakeReservation = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/api/books/${bookId}`);
        setBook(res.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching book details');
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    try {
      await axios.post('/api/reservations', {
        bookId,
        startDate: formData.startDate,
        endDate: formData.endDate
      });
      
      navigate('/reservations');
    } catch (err) {
      setError(err.response?.data?.msg || 'Error making reservation');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!book) {
    return <div className="alert alert-danger">Book not found</div>;
  }

  // Set minimum dates for reservation
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const minStartDate = today.toISOString().split('T')[0];
  const minEndDate = tomorrow.toISOString().split('T')[0];

  return (
    <div>
      <h1>Reserve Book</h1>
      <div className="card">
        <h3>{book.title}</h3>
        <p>Author: {book.author}</p>
        <p>Available: {book.available} / {book.quantity}</p>
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={onChange}
              min={minStartDate}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={onChange}
              min={formData.startDate || minEndDate}
              required
            />
          </div>
          <input type="submit" value="Reserve" className="btn btn-primary" />
        </form>
      </div>
    </div>
  );
};

export default MakeReservation;