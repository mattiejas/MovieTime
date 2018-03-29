import { getUserData } from '../utils/user';
import { login, logout } from '../utils/auth';

// Actions
export const authenticate = (username, password) => (dispatch) => {
  dispatch({ type: 'AUTHENTICATE_REQUEST' });
  return login(username, password).then(user =>
    getUserData(user.uid)
      .then((response) => {
        dispatch({
          type: 'AUTHENTICATE_SUCCESS',
          payload: response,
        });
        return response;
      })
      .catch((err) => {
        dispatch({ type: 'AUTHENTICATE_ERROR' });
        return err;
      }));
};

export const authenticateById = id => (dispatch) => {
  dispatch({ type: 'AUTHENTICATE_REQUEST' });
  return getUserData(id)
    .then((response) => {
      dispatch({
        type: 'AUTHENTICATE_SUCCESS',
        payload: { ...response, id },
      });
      return response;
    })
    .catch((err) => {
      dispatch({ type: 'AUTHENTICATE_ERROR' });
      return err;
    });
};

export const unauthenticate = () => (dispatch) => {
  dispatch({ type: 'UNAUTHENTICATE_REQUEST' });
  return logout().then(() => {
    dispatch({
      type: 'UNAUTHENTICATE_SUCCESS',
    });
  })
    .catch((err) => {
      dispatch({ type: 'UNAUTHENTICATE_ERROR' });
      return err;
    });
};

// Reducer
const initialState = {
  authenticated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHENTICATE_SUCCESS':
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      };
    case 'UNAUTHENTICATE_SUCCESS':
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
