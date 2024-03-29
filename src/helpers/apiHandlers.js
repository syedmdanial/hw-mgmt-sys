import axios from "axios";
import config from "../configs/constant";

export const API_BASE_URL = config.urls.api_base_url;

const prepareResponse = (response) => {
  console.log({ response });
  let err = false;
  let error_message = "";
  if (response.data.data === undefined) {
    error_message = "Api Failed to fetch the data";
    err = true;
  }

  if (err) {
    return {
      success: false,
      error: true,
      message: error_message,
      status: response.data.status,
      code: response.data.code,
      data: response.data.data || {},
    };
  } else {
    const responseData = {
      success: true,
      error: false,
      message: response.data.statusText,
      status: response.data.status,
      code: response.data.code,
      data: response.data.data,
    };

    if (response.data.pagination) {
      responseData.pagination = response.data.pagination;
    }
    return responseData;
  }
};

// Prepare catch
const prepareCatchResponse = (err) => {
  console.log({ err });
  if (err.response) {
    return {
      success: false,
      error: true,
      message: err.response.data.statusText,
      status: err.response.data.status,
      code: err.response.data.code,
      data: {},
    };
  } else {
    return {
      success: false,
      error: true,
      message: "Internal Server Error",
      status: 500,
      code: 500,
      data: {},
    };
  }
};

// Post request without access token
export const postRequestWithoutAccessToken = (url, data, next) => {
  axios
    .post(API_BASE_URL + url, data)
    .then((response) => {
      next(prepareResponse(response));
    })
    .catch((err) => {
      next(prepareCatchResponse(err));
    });
};

export const getRequest = (url, data, next) => {
  axios
    .get(API_BASE_URL + url, data)
    .then((response) => {
      next(prepareResponse(response));
    })
    .catch((err) => {
      next(prepareCatchResponse(err));
    });
};

export const getStaticRequest = (url, data, next) => {
  axios
    .get(API_BASE_URL + url, data)
    .then((response) => {
      next(response);
    })
    .catch((err) => {
      next(prepareCatchResponse(err));
    });
};

// Get without Authentication
export const getRequestWithoutAccessToken = async (url, next) => {
  try {
    const res = await axios.get(API_BASE_URL + url);
    next(prepareResponse(res));
  } catch (err) {
    next(prepareCatchResponse(err));
  }
};

export const postRequest = (url, data, token, next) => {
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axios
    .post(API_BASE_URL + url, data, headers)
    .then((response) => {
      next(prepareResponse(response));
    })
    .catch((err) => {
      next(prepareCatchResponse(err));
    });
};

export const postMultipartRequest = (url, data, token, next) => {
  const formData = new FormData();

  // Append each data field to the formData object
  for (const key in data) {
    formData.append(key, data[key]);
  }

  // // Append the Authorization header to the formData
  // formData.append(");

  axios
    .post(API_BASE_URL + url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      next(prepareResponse(response));
    })
    .catch((err) => {
      next(prepareCatchResponse(err));
    });
};

export const putRequest = (url, data, token, next) => {
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axios
    .put(API_BASE_URL + url, data, headers)
    .then((response) => {
      next(prepareResponse(response));
    })
    .catch((err) => {
      next(prepareCatchResponse(err));
    });
};

export const deleteRequest = (url, data, next) => {
  axios
    .delete(API_BASE_URL + url, data)
    .then((response) => {
      next(prepareResponse(response));
    })
    .catch((err) => {
      next(prepareCatchResponse(err));
    });
};

export const patchRequest = (url, data, token, next) => {
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axios
    .patch(API_BASE_URL + url, data, headers)
    .then((response) => {
      next(prepareResponse(response));
    })
    .catch((err) => {
      next(prepareCatchResponse(err));
    });
};
