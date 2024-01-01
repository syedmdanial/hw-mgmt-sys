import axios from 'axios';

axios.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    // console.log(error.response);
    return Promise.reject(error);
  }
);
