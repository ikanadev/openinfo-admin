import { AxiosInstance } from 'axios';

import conf from 'utils/config';
import endpoints from 'api/endpoints';
import { LoginReq, LoginResp, CheckTokenReq, CheckTokenResp, RegisterReq, RegisterRes } from './types';

const basicAuth = {
  auth: {
    username: conf.clientUser,
    password: conf.clientPassw,
  },
};

interface AuthAPI {
  login(data: LoginReq): Promise<LoginResp>;
  checkToken(data: CheckTokenReq): Promise<CheckTokenResp>;
  register(data: RegisterReq): Promise<RegisterRes>;
}

export default (axios: AxiosInstance): AuthAPI => ({
  login: async (data) => {
    const resp = await axios.post<LoginResp>(endpoints.auth.login, data, basicAuth);
    return resp.data;
  },
  checkToken: async (data) => {
    const resp = await axios.post<CheckTokenResp>(endpoints.auth.checkToken, data, basicAuth);
    return resp.data;
  },
  register: async (data) => {
    const resp = await axios.post<RegisterRes>(endpoints.auth.register, data);
    return resp.data;
  },
});
