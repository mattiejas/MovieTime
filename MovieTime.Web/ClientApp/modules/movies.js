import { getMovieByTitle } from '../utils/movie';

// Actions
export const requestMovieByTitle = title => (dispatch) => {
  dispatch({ type: 'FETCH_MOVIE_REQUEST' });
  return getMovieByTitle(title)
    .then((response) => {
      dispatch({
        type: 'FETCH_MOVIE_SUCCESS',
        payload: response,
      });
      return response;
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_MOVIE_ERROR' });
      return err;
    });
};

// Reducer
const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIE_SUCCESS':
      return {
        ...state,
        [action.payload.imdbId]: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
