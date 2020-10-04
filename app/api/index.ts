import Axios from 'axios';

import conf from 'utils/config';
import { getToken } from 'utils/function';
import notificationLogic from 'store/notifications';
import AuthAPI from './auth';

const axios = Axios.create({
  auth: {
    username: conf.clientUser,
    password: conf.clientPassw,
  },
  baseURL: conf.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

axios.interceptors.request.use((config) => {
  config.headers['Authorization'] = getToken();
  return config;
});

axios.interceptors.response.use(undefined, (error) => {
  if (Axios.isCancel(error)) {
    return Promise.reject<string>('requestCanceled');
  }
  const umount = notificationLogic.mount();
  if (error.response?.data?.error_description) {
    notificationLogic.actions.addWarning('Advertencia!', error.response.data.error_description as string);
    umount();
    return Promise.reject<string>(error.response.data.error_description);
  } else {
    notificationLogic.actions.addError('Error!', 'Error intentando comunicarse con el servidor');
    umount();
    return Promise.reject<string>('serverError');
  }
});

const api = {
  auth: AuthAPI(axios),
};

export default api;
