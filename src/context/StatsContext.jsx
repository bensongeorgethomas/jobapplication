import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import statsReducer from './reducers/statsReducer';
import { mockStats } from '../utils/mockData';

// Flag to use mock data when API is unavailable
const USE_MOCK_DATA = true; // Set to false when your backend is ready

// Initial state
const initialState = {
  stats: USE_MOCK_DATA ? mockStats : null,
  loading: !USE_MOCK_DATA,
  error: null,
};

// Create context
export const StatsContext = createContext(initialState);

// Provider component
export const StatsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(statsReducer, initialState);

  // Get stats
  const getStats = async () => {
    if (USE_MOCK_DATA) {
      if (state.stats) {
        return;
      }
      
      // Simulate API call with delay
      setTimeout(() => {
        dispatch({
          type: 'GET_STATS_SUCCESS',
          payload: mockStats,
        });
      }, 500);
      
      return;
    }
    
    try {
      dispatch({ type: 'STATS_LOADING' });
      
      const res = await axios.get('/api/jobs/stats');

      dispatch({
        type: 'GET_STATS_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
      
      // Fallback to mock data if API fails
      dispatch({
        type: 'GET_STATS_SUCCESS',
        payload: mockStats,
      });
    }
  };

  return (
    <StatsContext.Provider
      value={{
        stats: state.stats,
        loading: state.loading,
        error: state.error,
        getStats,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}; 