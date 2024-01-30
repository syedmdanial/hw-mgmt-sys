import {
  getRequest,
  postRequest,
  postRequestWithoutAccessToken,
  postMultipartRequest,
} from "../../helpers/apiHandlers";
import { toast } from "react-toastify";

export const getSubjectList = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    getRequest("/subjects", {}, (res) => {
      if (res.success) {
        resolve(res.data);
      } else {
        reject([]);
      }
    });
  });
};

export const addHomework = (hwData) => (dispatch) => {
  const data = {
    title: hwData.title,
    subject_id: hwData.subject_id,
    file: hwData.file,
    due_date: hwData.dueDate,
  };
  console.log(data);

  return new Promise((resolve, reject) => {
    postMultipartRequest("/homework", data, hwData.token, (res) => {
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        resolve(res);
      } else {
        if (res.status !== 401) toast.error(res.message);

        reject(res);
      }
    });
  });
};
