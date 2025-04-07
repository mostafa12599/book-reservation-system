import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const { login, isAuthenticated, error, clearErrors } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login({
      email,
      password
    });
  };

  if (isAuthenticated) {
    return <Navigate to='/books' />;
  }
  
  return (
    <div className='form-container'>
      <h1>Account Login</h1>
      {alertMessage && (
        <div className='alert alert-danger'>{alertMessage}</div>
      )}
      <form onSubmit={onSubmit}>
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
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;