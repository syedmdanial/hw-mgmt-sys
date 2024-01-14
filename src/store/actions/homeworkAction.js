import { getRequest } from "../../helpers/apiHandlers";

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
