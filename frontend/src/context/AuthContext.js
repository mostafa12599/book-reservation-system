import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import authReducer from './authReducer';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null
};


export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUser = async () => {
    console.log(localStorage.getItem('token'));
    
    if (localStorage.getItem('token')) {
      setAuthToken(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/api/users/me');

      dispatch({
        type: 'USER_LOADED',
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/users/register', formData, config);
      
      
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data
      });

      await loadUser();
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response.data.msg
      });
    }
  };

  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/users/login', formData, config);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });
      await sleep(1000);
      await loadUser();
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data.msg
      });
    }
  };

  const logout = () => dispatch({ type: 'LOGOUT' });

  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        loadUser,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};