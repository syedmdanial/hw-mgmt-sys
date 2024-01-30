import axios from "axios";
import { onLogout } from "../store/actions/authAction";
import { store } from "../store/store";
import { toast } from "react-toastify";

axios.interceptors.response.use(
  function (response) {
    // console.log(response);
    return response;
  },

  function (error) {
    console.log(error.response);
    if (error.response.data.status === 401) {
      if (
        error.response.data.code === 4005 ||
        error.response.data.code === 4006
      ) {
        let err_msg = `${error.response.data.statusText}. Please login again.`;
        toast.error(err_msg);
        store.dispatch(onLogout());
      }
    }

    return Promise.reject(error);
  }
);
