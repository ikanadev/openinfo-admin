import api from 'api';
import { kea, MakeLogicType } from 'kea';

import { getRole, getToken } from 'utils/function';
import { USER_TOKEN } from 'utils/const';
import { Roles, AuthData } from './types';

interface Values {
  data: AuthData;
  loadingAuth: boolean;
  checkingToken: boolean;
  title: string;
}

interface Actions {
  login: (username: string, passw: string) => { username: string; passw: string };
  setLoggedData: (
    isActive: boolean,
    role: Roles,
    username: string,
  ) => { isActive: boolean; role: Roles; username: string };
  saveToken: (token: string) => { token: string };
  logout: () => void;
  checkToken: () => void;
  setCheckLoading: (value: boolean) => { value: boolean };
  setTitle: (value: string) => { value: string };
}

const initialValue: AuthData = {
  isLogged: false,
  isActive: false,
  username: '',
  role: Roles.Leader,
};

const authLogic = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    login: (username, passw) => ({ username, passw }),
    setLoggedData: (isActive, role, username) => ({ isActive, role, username }),
    saveToken: (token) => ({ token }),
    logout: () => ({}),
    checkToken: () => ({}),
    setCheckLoading: (value) => ({ value }),
    setTitle: (value) => ({ value }),
  },
  defaults: {
    data: initialValue,
    loadingAuth: false,
    checkingToken: true,
    title: 'Inicio',
  },
  reducers: {
    data: {
      setLoggedData: (_, { isActive, role, username }) => ({ isLogged: true, isActive, role, username }),
      logout: () => initialValue,
    },
    loadingAuth: {
      login: () => true,
      saveToken: () => false,
      logout: () => false,
    },
    checkingToken: {
      setLoggedData: () => false,
      saveToken: () => true,
      logout: () => false,
      setCheckLoading: (_, { value }) => value,
    },
    title: {
      setTitle: (_, { value }) => value,
      logout: () => 'Inicio',
    },
  },
  listeners: ({ actions }) => ({
    login: async ({ username, passw }) => {
      try {
        const loginData = await api.auth.login({ username, password: passw, grant_type: 'password' });
        actions.saveToken(loginData.access_token);
        localStorage.setItem(USER_TOKEN, loginData.access_token);
        const checkTokenData = await api.auth.checkToken({ token: loginData.access_token });
        actions.setLoggedData(checkTokenData.active, getRole(checkTokenData.authorities[0]), checkTokenData.user_name);
      } catch (err) {
        actions.logout();
        // errors are handled in axios response interceptor
      }
    },
    checkToken: async () => {
      const token = getToken();
      if (token === '') {
        actions.setCheckLoading(false);
        return;
      }
      try {
        const data = await api.auth.checkToken({ token: getToken() });
        actions.setLoggedData(data.active, getRole(data.authorities[0]), data.user_name);
      } catch (err) {
        actions.logout();
        // errors is are handled in axios response interceptor
      }
    },
    logout: () => {
      localStorage.removeItem(USER_TOKEN);
    },
  }),
});

export default authLogic;
