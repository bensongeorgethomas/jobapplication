const statsReducer = (state, action) => {
  switch (action.type) {
    case 'STATS_LOADING':
      return {
        ...state,
        loading: true
      };
    case 'GET_STATS_SUCCESS':
      return {
        ...state,
        stats: action.payload,
        loading: false,
        error: null
      };
    case 'STATS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'CLEAR_STATS':
      return {
        ...state,
        stats: null,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

export default statsReducer; 