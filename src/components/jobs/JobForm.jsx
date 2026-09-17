import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JobContext } from '../../context/JobContext';

const JobForm = () => {
  const jobContext = useContext(JobContext);
  const { addJob, updateJob, getJob, job, clearJobs } = jobContext;

  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    status: 'Applied',
    applicationDate: new Date().toISOString().substr(0, 10),
    jobDescription: '',
    notes: '',
    salary: '',
    jobType: 'Full-time',
    url: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });

  useEffect(() => {
    if (isEdit) {
      getJob(id);
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (job !== null && isEdit) {
      const jobDate = job.applicationDate
        ? new Date(job.applicationDate).toISOString().substr(0, 10)
        : new Date().toISOString().substr(0, 10);

      setFormData({
        company: job.company || '',
        position: job.position || '',
        location: job.location || '',
        status: job.status || 'Applied',
        applicationDate: jobDate,
        jobDescription: job.jobDescription || '',
        notes: job.notes || '',
        salary: job.salary || '',
        jobType: job.jobType || 'Full-time',
        url: job.url || '',
        contactName: job.contactName || '',
        contactEmail: job.contactEmail || '',
        contactPhone: job.contactPhone || '',
      });
    }
  }, [job, isEdit]);

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
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (company === '' || position === '') {
      alert('Please enter company and position');
    } else if (isEdit) {
      updateJob({ ...formData, _id: id });
      navigate('/dashboard');
    } else {
      addJob(formData);
      navigate('/dashboard');
    }
  };

  return (
    <div className='form-container'>
      <h1>{isEdit ? 'Edit Job' : 'Add Job'}</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='company'>Company*</label>
          <input
            id='company'
            type='text'
            name='company'
            value={company}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='position'>Position*</label>
          <input
            id='position'
            type='text'
            name='position'
            value={position}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            id='location'
            type='text'
            name='location'
            value={location}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='status'>Status</label>
          <select
            id='status'
            name='status'
            value={status}
            onChange={onChange}
          >
            <option value='Applied'>Applied</option>
            <option value='Interview'>Interview</option>
            <option value='Offer'>Offer</option>
            <option value='Rejected'>Rejected</option>
            <option value='Saved'>Saved</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='applicationDate'>Application Date</label>
          <input
            id='applicationDate'
            type='date'
            name='applicationDate'
            value={applicationDate}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='jobType'>Job Type</label>
          <select
            id='jobType'
            name='jobType'
            value={jobType}
            onChange={onChange}
          >
            <option value='Full-time'>Full-time</option>
            <option value='Part-time'>Part-time</option>
            <option value='Contract'>Contract</option>
            <option value='Internship'>Internship</option>
            <option value='Remote'>Remote</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='salary'>Salary</label>
          <input
            id='salary'
            type='text'
            name='salary'
            value={salary}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='url'>Job URL</label>
          <input
            id='url'
            type='text'
            name='url'
            value={url}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='jobDescription'>Job Description</label>
          <textarea
            id='jobDescription'
            name='jobDescription'
            value={jobDescription}
            onChange={onChange}
            rows='4'
          ></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='notes'>Notes</label>
          <textarea
            id='notes'
            name='notes'
            value={notes}
            onChange={onChange}
            rows='4'
          ></textarea>
        </div>
        <h3>Contact Information</h3>
        <div className='form-group'>
          <label htmlFor='contactName'>Contact Name</label>
          <input
            id='contactName'
            type='text'
            name='contactName'
            value={contactName}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='contactEmail'>Contact Email</label>
          <input
            id='contactEmail'
            type='email'
            name='contactEmail'
            value={contactEmail}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='contactPhone'>Contact Phone</label>
          <input
            id='contactPhone'
            type='text'
            name='contactPhone'
            value={contactPhone}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type='submit'
            value={isEdit ? 'Update Job' : 'Add Job'}
            className='btn btn-primary btn-block'
          />
        </div>
      </form>
    </div>
  );
};

export default JobForm; 