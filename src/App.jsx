import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import JobForm from './components/jobs/JobForm';
import JobDetail from './components/jobs/JobDetail';
import PrivateRoute from './components/routing/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/jobs/new" 
                element={
                  <PrivateRoute>
                    <JobForm />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/jobs/edit/:id" 
                element={
                  <PrivateRoute>
                    <JobForm />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/jobs/:id" 
                element={
                  <PrivateRoute>
                    <JobDetail />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
};

export default App; 