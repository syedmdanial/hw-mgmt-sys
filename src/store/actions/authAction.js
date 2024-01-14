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

// Login
export const loginUser = (loginData) => (dispatch) => {
  // console.log(loginData);
  const data = {
    email: loginData.email,
    password: loginData.password,
  };

  dispatch(setLoadingStatus(true));

  postRequest("/login", data, {}, (res) => {
    dispatch(setLoadingStatus(false));

    // console.log(res);
    if (res.success) {
      dispatch(setLoginSuccess(res.data));
      toast.success(res.message);
      historyPush("/homework");
    } else {
      toast.error(res.message);
    }
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
