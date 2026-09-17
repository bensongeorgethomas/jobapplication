import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const JobItem = ({ job }) => {
  const { _id, company, position, status, applicationDate } = job;

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get status class
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'applied':
        return 'applied';
      case 'interview':
        return 'interview';
      case 'offer':
        return 'offer';
      case 'rejected':
        return 'rejected';
      case 'saved':
        return 'saved';
      default:
        return '';
    }
  };

  return (
    <div className='job-card'>
      <h3>{position}</h3>
      <p>{company}</p>
      <span className={`status ${getStatusClass(status)}`}>{status}</span>
      <p>Applied on: {formatDate(applicationDate)}</p>
      <div className='job-card-actions'>
        <Link to={`/jobs/${_id}`} className='btn btn-dark btn-sm'>
          View
        </Link>
        <Link to={`/jobs/edit/${_id}`} className='btn btn-primary btn-sm'>
          Edit
        </Link>
      </div>
    </div>
  );
};

JobItem.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobItem; 