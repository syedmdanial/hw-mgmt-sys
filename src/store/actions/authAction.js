import { historyPush } from '../../routes/historyPush';
// import cogoToast from 'cogo-toast';
// import {
//   postRequestWithoutAccessToken,
//   putRequest,
//   getRequest,
// } from '../../helpers/apiHandlers';
import { LOGIN_SUCCESS, LOGOUT, UPDATE_LOADING_STATUS } from '../actionTypes';
// import { store } from '../store';

export const setLoadingStatus = (isLoading) => ({
  type: UPDATE_LOADING_STATUS,
  payload: isLoading,
});

export const setLoginSuccess = (res) => ({
  type: LOGIN_SUCCESS,
  payload: res,
});

// Login Using SSO
export const login = (loginData) => (dispatch) => {
  console.log(loginData);
  // const data = {

  // };

  // let resMsg = 'Login Successfully';

  // dispatch(setLoadingStatus(true));

  // postRequestWithoutAccessToken('/login/sso', data, (res) => {
  //   dispatch(setLoadingStatus(false));
  //   if (res.success) {
  //     dispatch(setLoginSuccess(res.data));
  //     dispatch(setStaySignIn(data.staySignIn));

  //     if (res.code !== 200) {
  //       resMsg = res.message;
  //     }

  //     cogoToast.success(resMsg, { position: 'top-right' });
  //     historyPush('/dashboard');
  //   } else {
  //     if (res.message !== 'Account Suspended') {
  //       cogoToast.error(res.message, { position: 'top-right' });
  //     }
  //   }
  // });
};

export const logoutUser = () => ({
  type: LOGOUT,
  payload: {},
});

// Logout and delete session
export const onLogout = () => (dispatch) => {
  // const authRedux = store.getState().auth;
  // // authRedux.msal.logout();
  // if (Object.keys(authRedux.msal).length > 0) {
  //   const session = window.sessionStorage;
  //   session.clear();
  // }
  dispatch(logoutUser());
  historyPush('/login');
};
