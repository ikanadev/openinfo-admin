import { AxiosInstance } from 'axios';

import endpoints from 'api/endpoints';
import { LoginReq, LoginResp, CheckTokenReq, CheckTokenResp } from './types';

interface AuthAPI {
  login(data: LoginReq): Promise<LoginResp>;
  checkToken(data: CheckTokenReq): Promise<CheckTokenResp>;
}

export default (axios: AxiosInstance): AuthAPI => ({
  login: async (data) => {
    const resp = await axios.post<LoginResp>(endpoints.auth.login, data);
    return resp.data;
  },
  checkToken: async (data) => {
    const resp = await axios.post<CheckTokenResp>(endpoints.auth.checkToken, data);
    return resp.data;
  },
});
