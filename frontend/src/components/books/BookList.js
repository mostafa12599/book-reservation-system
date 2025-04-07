import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const BookList = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('/api/books');
        setBooks(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching books:', err);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Available Books</h1>
      <div className="book-list">
        {books.length === 0 ? (
          <p>No books available in the library.</p>
        ) : (
          <div className="card-grid">
            {books.map(book => (
              <div key={book._id} className="card">
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>ISBN: {book.isbn}</p>
                <p>Available: {book.available} / {book.quantity}</p>
                {isAuthenticated && book.available > 0 ? (
                  <Link to={`/reserve/${book._id}`} className="btn btn-primary">
                    Reserve
                  </Link>
                ) : (
                  <p className="text-muted">
                    {!isAuthenticated
                      ? 'Login to reserve'
                      : 'Currently unavailable'}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;