import React, { createContext, useReducer } from 'react';
import jobReducer from './reducers/jobReducer';
import { mockJobs, mockStats } from '../utils/mockData';
import api from '../utils/api';

// Flag to use mock data when API is unavailable
const USE_MOCK_DATA = false; // Set to false to use real database

// Initial state
const initialState = {
  jobs: [],
  job: null,
  loading: true,
  error: null,
  filtered: null,
  stats: {
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
    saved: 0,
  },
};

// Create context
export const JobContext = createContext(initialState);

// Provider component
export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState);

  // Get Jobs
  const getJobs = async () => {
    try {
      dispatch({ type: 'STATS_LOADING' });
      
      if (USE_MOCK_DATA) {
        // Use mock data
        setTimeout(() => {
          dispatch({
            type: 'GET_JOBS',
            payload: mockJobs,
          });
        }, 500);
      } else {
        const res = await api.get('/api/jobs');
        
        if (res.data) {
          dispatch({
            type: 'GET_JOBS',
            payload: res.data,
          });
        } else {
          throw new Error('No data received from server');
        }
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      dispatch({
        type: 'JOB_ERROR',
        payload: err.response?.data?.msg || 'Error fetching jobs',
      });
    }
  };

  // Get Job
  const getJob = async (id) => {
    try {
      dispatch({ type: 'STATS_LOADING' });
      
      if (USE_MOCK_DATA) {
        const job = mockJobs.find(job => job._id === id);
        if (job) {
          dispatch({
            type: 'GET_JOB',
            payload: job,
          });
        } else {
          throw new Error('Job not found');
        }
      } else {
        const res = await api.get(`/api/jobs/${id}`);
        
        if (res.data) {
          dispatch({
            type: 'GET_JOB',
            payload: res.data,
          });
        } else {
          throw new Error('Job not found');
        }
      }
    } catch (err) {
      console.error('Error fetching job:', err);
      dispatch({
        type: 'JOB_ERROR',
        payload: err.response?.data?.msg || 'Error fetching job',
      });
    }
  };

  // Add Job
  const addJob = async (job) => {

    try {
      dispatch({ type: 'STATS_LOADING' });
      
      if (USE_MOCK_DATA) {
        const newJob = {
          ...job,
          _id: String(mockJobs.length + 1),
          applicationDate: new Date(job.applicationDate),
        };
        
        setTimeout(() => {
          dispatch({
            type: 'ADD_JOB',
            payload: newJob,
          });
        }, 500);
      } else {
        const res = await api.post('/api/jobs', job);
        
        if (res.data) {
          dispatch({
            type: 'ADD_JOB',
            payload: res.data,
          });
          return true; // Return success
        } else {
          throw new Error('Failed to add job');
        }
      }
    } catch (err) {
      console.error('Error adding job:', err);
      dispatch({
        type: 'JOB_ERROR',
        payload: err.response?.data?.msg || 'Error adding job',
      });
      return false; // Return failure
    }
  };

  // Update Job
  const updateJob = async (job) => {

    try {
      dispatch({ type: 'STATS_LOADING' });
      
      if (USE_MOCK_DATA) {
        const updatedJob = {
          ...job,
          applicationDate: new Date(job.applicationDate),
        };
        
        setTimeout(() => {
          dispatch({
            type: 'UPDATE_JOB',
            payload: updatedJob,
          });
        }, 500);
      } else {
        const res = await api.put(`/api/jobs/${job._id}`, job);
        
        if (res.data) {
          dispatch({
            type: 'UPDATE_JOB',
            payload: res.data,
          });
          return true; // Return success
        } else {
          throw new Error('Failed to update job');
        }
      }
    } catch (err) {
      console.error('Error updating job:', err);
      dispatch({
        type: 'JOB_ERROR',
        payload: err.response?.data?.msg || 'Error updating job',
      });
      return false; // Return failure
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    try {
      dispatch({ type: 'STATS_LOADING' });
      
      if (USE_MOCK_DATA) {
        setTimeout(() => {
          dispatch({
            type: 'DELETE_JOB',
            payload: id,
          });
        }, 500);
      } else {
        const res = await api.delete(`/api/jobs/${id}`);
        
        if (res.status === 200) {
          dispatch({
            type: 'DELETE_JOB',
            payload: id,
          });
          return true; // Return success
        } else {
          throw new Error('Failed to delete job');
        }
      }
    } catch (err) {
      console.error('Error deleting job:', err);
      dispatch({
        type: 'JOB_ERROR',
        payload: err.response?.data?.msg || 'Error deleting job',
      });
      return false; // Return failure
    }
  };

  // Filter Jobs
  const filterJobs = (text) => {
    dispatch({ type: 'FILTER_JOBS', payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: 'CLEAR_FILTER' });
  };

  // Clear Jobs
  const clearJobs = () => {
    dispatch({ type: 'CLEAR_JOBS' });
  };

  return (
    <JobContext.Provider
      value={{
        jobs: state.jobs,
        job: state.job,
        loading: state.loading,
        error: state.error,
        filtered: state.filtered,
        stats: state.stats,
        getJobs,
        getJob,
        addJob,
        updateJob,
        deleteJob,
        filterJobs,
        clearFilter,
        clearJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}; 