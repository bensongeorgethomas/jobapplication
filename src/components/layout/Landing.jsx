import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Landing = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  
  const { isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className="landing">
      <div className="landing-inner">
        <h1 className="x-large">Student Job Tracker</h1>
        <p className="lead">
          Track your job applications, interviews, and offers in one beautifully modern place.
        </p>
        <div className="buttons">
          <Link to="/register" className="btn btn-primary">
            Sign Up Now
          </Link>
          <Link to="/login" className="btn btn-light">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing; 