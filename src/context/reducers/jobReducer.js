// Helper function to calculate stats
const calculateStats = (jobs) => {
  const stats = {
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
    saved: 0, // Assuming 'saved' is a possible status
  };

  jobs.forEach((job) => {
    const status = job.status?.toLowerCase(); // Add null check for status
    if (status && stats.hasOwnProperty(status)) {
      stats[status]++;
    }
  });
  return stats;
};

const jobReducer = (state, action) => {
  switch (action.type) {
    case 'GET_JOBS':
      return {
        ...state,
        jobs: action.payload,
        stats: calculateStats(action.payload),
        loading: false,
      };
    case 'GET_JOB':
      return {
        ...state,
        job: action.payload,
        loading: false,
      };
    case 'ADD_JOB': {
      const updatedJobs = [action.payload, ...state.jobs];
      return {
        ...state,
        jobs: updatedJobs,
        stats: calculateStats(updatedJobs),
        loading: false,
      };
    }
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job._id === action.payload._id ? action.payload : job
        ),
        loading: false,
      };
    case 'DELETE_JOB': {
      const updatedJobs = state.jobs.filter((job) => job._id !== action.payload);
      return {
        ...state,
        jobs: updatedJobs,
        stats: calculateStats(updatedJobs),
        loading: false,
      };
    }
    case 'CLEAR_JOBS':
      return {
        ...state,
        jobs: [],
        job: null,
        filtered: null,
        error: null,
        loading: false,
      };
    case 'FILTER_JOBS':
      return {
        ...state,
        filtered: state.jobs.filter((job) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            job.company.match(regex) ||
            job.position.match(regex) ||
            job.location.match(regex) ||
            job.status.match(regex) ||
            (job.notes && job.notes.match(regex))
          );
        }),
      };
    case 'CLEAR_FILTER':
      return {
        ...state,
        filtered: null,
      };
    case 'JOB_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default jobReducer; 