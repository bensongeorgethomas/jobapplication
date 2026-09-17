import React, { createContext, useReducer, useEffect } from 'react';
import authReducer from './reducers/authReducer';
import setAuthToken from '../utils/setAuthToken';
import { mockUser } from '../utils/mockData';
import api from '../utils/api';

// Flag to use mock data when API is unavailable
const USE_MOCK_DATA = false; // Set to false to use real authentication

// Initial state
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null,
};

// Create context
export const AuthContext = createContext(initialState);

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (USE_MOCK_DATA) {
      dispatch({
        type: 'USER_LOADED',
        payload: mockUser,
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        const res = await api.get('/api/auth');
        dispatch({
          type: 'USER_LOADED',
          payload: res.data,
        });
      } else {
        dispatch({
          type: 'AUTH_ERROR',
        });
      }
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
      });
    }
  };

  // Register User
  const register = async (formData) => {
    if (USE_MOCK_DATA) {
      setTimeout(() => {
        const mockToken = 'mock-token-12345';
        localStorage.setItem('token', mockToken);
        setAuthToken(mockToken);
        
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: { token: mockToken },
        });
        
        dispatch({
          type: 'USER_LOADED',
          payload: mockUser,
        });
      }, 500);
      return;
    }
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await api.post('/api/users', formData);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });
      setAuthToken(res.data.token);
      await loadUser();
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response?.data?.msg || 'Registration failed',
      });
    }
  };

  // Login User
  const login = async (formData) => {
    if (USE_MOCK_DATA) {
      if (formData.email === 'test@example.com' && formData.password === 'password') {
        setTimeout(() => {
          const mockToken = 'mock-token-12345';
          localStorage.setItem('token', mockToken);
          setAuthToken(mockToken);
          
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { token: mockToken },
          });
          
          dispatch({
            type: 'USER_LOADED',
            payload: mockUser,
          });
        }, 500);
      } else {
        dispatch({
          type: 'LOGIN_FAIL',
          payload: 'Invalid credentials',
        });
      }
      return;
    }
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await api.post('/api/auth', formData);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data,
      });
      setAuthToken(res.data.token);
      await loadUser();
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response?.data?.msg || 'Invalid credentials',
      });
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    setAuthToken(null);
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  useEffect(() => {
    loadUser();
  }, []);

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
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 