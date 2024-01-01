import { combineReducers } from 'redux';
import authReducer from './authReducer';

// Combine all reducers.
const appReducer = combineReducers({
  auth: authReducer,
});

// Reset Store after logout
// https://medium.com/mfec/clear-state-in-redux-store-f846ec5fc0c0
const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === 'LOGOUT') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
