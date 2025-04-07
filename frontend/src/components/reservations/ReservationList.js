import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const ReservationList = () => {
  const { loadUser } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadUser();
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await axios.get('/api/reservations');
      setReservations(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setLoading(false);
    }
  };

  const cancelReservation = async id => {
    try {
      await axios.put(`/api/reservations/${id}`);
      setMessage('Reservation cancelled successfully');
      setTimeout(() => setMessage(null), 3000);
      fetchReservations();
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error cancelling reservation');
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Reservations</h1>
      {message && <div className="alert alert-success">{message}</div>}
      {reservations.length === 0 ? (
        <p>You have no active reservations.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Book</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <tr key={reservation._id}>
                <td>{reservation.book.title}</td>
                <td>{new Date(reservation.startDate).toLocaleDateString()}</td>
                <td>{new Date(reservation.endDate).toLocaleDateString()}</td>
                <td>{reservation.status}</td>
                <td>
                  {reservation.status === 'active' && (
                    <button
                      onClick={() => cancelReservation(reservation._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservationList;