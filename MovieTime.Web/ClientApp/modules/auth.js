// Actions
export const setAuthenticated = user => ({
  type: 'SET_AUTHENTICATED',
  payload: user,
});

export const setUnauthenticated = () => ({
  type: 'SET_UNAUTHENTICATED',
});

// Reducer
const initialState = {
  authenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTHENTICATED':
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      };
    case 'SET_UNAUTHENTICATED':
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
