import { toast } from "react-toastify";
import { historyPush } from "../../routes/historyPush";
import { postRequest } from "../../helpers/apiHandlers";
import { LOGIN_SUCCESS, LOGOUT, UPDATE_LOADING_STATUS } from "../actionTypes";
// import { store } from '../store';

export const setLoadingStatus = (isLoading) => ({
  type: UPDATE_LOADING_STATUS,
  payload: isLoading,
});

export const setLoginSuccess = (res) => ({
  type: LOGIN_SUCCESS,
  payload: res,
});

// Check User Password
export const checkUser = (userData) => (dispatch) => {
  const data = {
    email: userData.email,
  };

  dispatch(setLoadingStatus(true));

  return new Promise((resolve, reject) => {
    postRequest("/check-password", data, {}, (res) => {
      dispatch(setLoadingStatus(false));

      console.log(res);
      if (res.success) {
        if (res.code === 4007) {
          toast.success(res.message);
          resolve(res);
        } else if (res.code === 4004) {
          toast.error(res.message);
          resolve(res);
        }
      } else {
        toast.error(res.message);
        reject();
      }
    });
  });
};

// Register Password
export const registerPassword = (userData) => (dispatch) => {
  const data = {
    email: userData.email,
    password: userData.password,
  };

  dispatch(setLoadingStatus(true));

  return new Promise((resolve, reject) => {
    postRequest("/register-password", data, {}, (res) => {
      dispatch(setLoadingStatus(false));

      console.log(res);
      if (res.success) {
        toast.success(res.message);
        resolve(res);
      } else {
        toast.error(res.message);
        reject();
      }
    });
  });
};

// Login
export const loginUser = (loginData) => (dispatch) => {
  // console.log(loginData);
  const data = {
    email: loginData.email,
    password: loginData.password,
  };

  dispatch(setLoadingStatus(true));

  return new Promise((resolve, reject) => {
    postRequest("/login", data, {}, (res) => {
      dispatch(setLoadingStatus(false));

      console.log(res);
      if (res.success) {
        dispatch(setLoginSuccess(res.data));
        toast.success(res.message);
        resolve(res);
      } else {
        toast.error(res.message);
        reject();
      }
    });
  });
};

// Register
export const registerUser = (registerData) => (dispatch) => {
  // console.log(registerData);
  const data = {
    email: registerData.email,
    name: registerData.name,
    password: registerData.password,
    user_type: registerData.user_type,
  };

  dispatch(setLoadingStatus(true));

  postRequest("/register", data, {}, (res) => {
    dispatch(setLoadingStatus(false));

    // console.log(res);
    if (res.success) {
      historyPush("/login");
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  });
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
  historyPush("/login");
};
