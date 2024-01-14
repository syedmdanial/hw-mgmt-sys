import { getRequest, postRequest } from "../../helpers/apiHandlers";

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
    subject: hwData.subject,
    file: hwData.file,
    due_date: hwData.dueDate,
    user_id: hwData.user._id,
  };

  return new Promise((resolve, reject) => {
    postRequest("/homework", data, hwData.user.token, (res) => {
      console.log(res);
      if (res.success) {
        resolve(res.data);
      } else {
        reject([]);
      }
    });
  });
};
