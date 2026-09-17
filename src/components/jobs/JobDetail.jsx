import React, { useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { JobContext } from '../../context/JobContext';

const JobDetail = () => {
  const jobContext = useContext(JobContext);
  const { job, getJob, deleteJob, loading } = jobContext;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getJob(id);
    // eslint-disable-next-line
  }, [id]);

  if (loading || job === null) {
    return <div>Loading...</div>;
  }

  const {
    company,
    position,
    location,
    status,
    applicationDate,
    jobDescription,
    notes,
    salary,
    jobType,
    url,
    contactName,
    contactEmail,
    contactPhone,
  } = job;

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const onDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      const success = await deleteJob(id);
      if (success) {
        navigate('/dashboard');
      } else {
        alert('Failed to delete job. Please try again.');
      }
    }
  };

  return (
    <div className='job-detail'>
      <div className='job-header'>
        <div>
          <h1>{position}</h1>
          <h2>{company}</h2>
          {location && <p>{location}</p>}
        </div>
        <div>
          <span className={`status ${status.toLowerCase()}`}>{status}</span>
        </div>
      </div>

      <div className='job-info'>
        <div className='job-info-item'>
          <span>Application Date</span>
          <span>{formatDate(applicationDate)}</span>
        </div>
        {jobType && (
          <div className='job-info-item'>
            <span>Job Type</span>
            <span>{jobType}</span>
          </div>
        )}
        {salary && (
          <div className='job-info-item'>
            <span>Salary</span>
            <span>{salary}</span>
          </div>
        )}
        {url && (
          <div className='job-info-item'>
            <span>URL</span>
            <a href={url} target='_blank' rel='noopener noreferrer'>
              Job Posting
            </a>
          </div>
        )}
      </div>

      {jobDescription && (
        <div className='job-section'>
          <h3>Job Description</h3>
          <p>{jobDescription}</p>
        </div>
      )}

      {notes && (
        <div className='job-section'>
          <h3>Notes</h3>
          <p>{notes}</p>
        </div>
      )}

      {(contactName || contactEmail || contactPhone) && (
        <div className='job-section'>
          <h3>Contact Information</h3>
          {contactName && <p>Name: {contactName}</p>}
          {contactEmail && (
            <p>
              Email:{' '}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </p>
          )}
          {contactPhone && (
            <p>
              Phone:{' '}
              <a href={`tel:${contactPhone}`}>{contactPhone}</a>
            </p>
          )}
        </div>
      )}

      <div className='btn-group'>
        <Link to={`/jobs/edit/${id}`} className='btn btn-primary'>
          Edit
        </Link>
        <button onClick={onDelete} className='btn btn-danger'>
          Delete
        </button>
        <Link to='/dashboard' className='btn btn-dark'>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default JobDetail; 