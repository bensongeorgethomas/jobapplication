import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { JobContext } from '../../context/JobContext';
import { AuthContext } from '../../context/AuthContext';
import JobItem from '../jobs/JobItem';

const Dashboard = () => {
  const jobContext = useContext(JobContext);
  const authContext = useContext(AuthContext);

  const { jobs, getJobs, loading, error, filtered, filterJobs, clearFilter, stats } = jobContext;
  const { user } = authContext;

  const [filter, setFilter] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setFilter(e.target.value);
    
    if (e.target.value !== '') {
      filterJobs(e.target.value);
    } else {
      clearFilter();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getJobs();
    setIsRefreshing(false);
  };

  if (loading && !isRefreshing) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your job applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={handleRefresh}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='dashboard' >
      <h1> Dashboard </h1>
      {user && <h2>Welcome, {user.name}</h2>}
      
      <div className='dashboard-stats'>
        <div className='stat-card'>
          <h3>{stats.applied}</h3>
          <p>Applied</p>
        </div>
        <div className='stat-card'>
          <h3>{stats.interview}</h3>
          <p>Interviews</p>
        </div>
        <div className='stat-card'>
          <h3>{stats.offer}</h3>
          <p>Offers</p>
        </div>
        <div className='stat-card'>
          <h3>{stats.rejected}</h3>
          <p>Rejected</p>
        </div>
        <div className='stat-card'>
          <h3>{stats.saved}</h3>
          <p>Saved</p>
        </div>
      </div>
      
      <div className='dashboard-filter'>
        <div className="filter-group">
          <input
            type='text'
            placeholder='Search jobs...'
            onChange={onChange}
            value={filter}
          />
          <button 
            className="btn btn-secondary" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        <Link to='/jobs/new' className='btn btn-primary'>
          <i className='fas fa-plus'></i> Add New Job
        </Link>
      </div>
      
      <div className='job-list'>
        {filtered !== null
          ? filtered.map((job) => <JobItem key={job._id} job={job} />)
          : jobs.map((job) => <JobItem key={job._id} job={job} />)}
        
        {jobs.length === 0 && (
          <div className="no-jobs">
            <p>No job applications found. Start by adding a new job!</p>
            <Link to='/jobs/new' className='btn btn-primary'>
              Add Your First Job
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 