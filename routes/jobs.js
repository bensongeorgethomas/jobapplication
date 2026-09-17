const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');
const User = require('../models/User');

// @route   GET api/jobs
// @desc    Get all jobs
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id }).sort({ applicationDate: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/jobs/:id
// @desc    Get job by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Check if the job belongs to the user
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(job);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/jobs
// @desc    Create a job
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
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
    } = req.body;

    // Create job object
    const jobFields = {
      user: req.user.id,
      company,
      position,
    };

    // Optional fields
    if (location) jobFields.location = location;
    if (status) jobFields.status = status;
    if (applicationDate) jobFields.applicationDate = applicationDate;
    if (jobDescription) jobFields.jobDescription = jobDescription;
    if (notes) jobFields.notes = notes;
    if (salary) jobFields.salary = salary;
    if (jobType) jobFields.jobType = jobType;
    if (url) jobFields.url = url;
    if (contactName) jobFields.contactName = contactName;
    if (contactEmail) jobFields.contactEmail = contactEmail;
    if (contactPhone) jobFields.contactPhone = contactPhone;

    const job = new Job(jobFields);
    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/jobs/:id
// @desc    Update a job
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
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
    } = req.body;

    // Find the job
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Check if the job belongs to the user
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Create job object
    const jobFields = {};

    // Optional fields
    if (company) jobFields.company = company;
    if (position) jobFields.position = position;
    if (location) jobFields.location = location;
    if (status) jobFields.status = status;
    if (applicationDate) jobFields.applicationDate = applicationDate;
    if (jobDescription) jobFields.jobDescription = jobDescription;
    if (notes) jobFields.notes = notes;
    if (salary) jobFields.salary = salary;
    if (jobType) jobFields.jobType = jobType;
    if (url) jobFields.url = url;
    if (contactName) jobFields.contactName = contactName;
    if (contactEmail) jobFields.contactEmail = contactEmail;
    if (contactPhone) jobFields.contactPhone = contactPhone;

    // Update job
    job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: jobFields },
      { new: true }
    );

    res.json(job);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/jobs/:id
// @desc    Delete a job
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Check if the job belongs to the user
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Job removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router; 