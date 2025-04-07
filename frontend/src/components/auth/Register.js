import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const { register, isAuthenticated, error, clearErrors } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (error) {
      setAlertMessage(error);
      setTimeout(() => {
        clearErrors();
        setAlertMessage('');
      }, 5000);
    }
  }, [error, clearErrors]);

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlertMessage('Passwords do not match');
      setTimeout(() => setAlertMessage(''), 5000);
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/books' />;
  }

  return (
    <div className='form-container'>
      <h1>Account Registration</h1>
      {alertMessage && (
        <div className='alert alert-danger'>{alertMessage}</div>
      )}
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;