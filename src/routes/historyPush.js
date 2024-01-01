// eslint-disable-next-line import/prefer-default-export
import { history } from './history';

export const historyPush = (url) => {
  const baseUrl = process.env.PUBLIC_URL;
  history.push(`${baseUrl}${url}`);
};
