import { getUserData, updateUserData } from '../utils/user';

// Actions
export const updateUser = user => (dispatch) => {
  dispatch({ type: 'UPDATE_USER_REQUEST' });
  return updateUserData(user)
    .then(() => {
      dispatch({
        type: 'UPDATE_USER_SUCCESS',
        payload: user,
      });
      return user;
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_USER_ERROR' });
      return err;
    });
};

export const getUser = id => (dispatch) => {
  dispatch({ type: 'FETCH_USER_REQUEST' });
  return getUserData(id)
    .then((response) => {
      dispatch({
        type: 'FETCH_USER_SUCCESS',
        payload: { ...response, id },
      });
      return response;
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_USER_ERROR' });
      return err;
    });
};

// Reducer
const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
