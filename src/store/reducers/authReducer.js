import { LOGIN_SUCCESS, LOGOUT, UPDATE_LOADING_STATUS } from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  isLoggedIn: false,
  token: null,
  user: {
    id: null,
    name: '',
  },
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case UPDATE_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
