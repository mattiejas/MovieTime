// Actions
export const logout = () => ({
  type: 'LOGOUT',
});


// Reducer
const initialState = {
  authenticated: true,
};

const authReducer = (state = initialState, action) => {
  console.log('state', state);
  console.log('action', action);
  switch (action.type) {
    case 'LOGIN':
      return [
        ...state,
        {
          authenticated: true,
        },
      ];
    case 'LOGOUT':
      return [
        ...state,
        {
          authenticated: false,
        },
      ];
    default:
      return state;
  }
};

export default authReducer;
