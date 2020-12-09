import { AxiosInstance } from 'axios';

import endpoints from './endpoints';
import {
  CommissionRes,
  NewCommissionReq,
  NewCommissionRes,
  DelCommissionRes,
  ResetPassUserReq,
  ResetPassUserRes,
  UpdateUserReq,
  UpdateUserRes,
} from './types';

interface AdminAPI {
  getCommission(): Promise<CommissionRes>;
  postCommission(data: NewCommissionReq): Promise<NewCommissionRes>;
  delCommission(code: string): Promise<DelCommissionRes>;
  resetPassUser(data: ResetPassUserReq): Promise<ResetPassUserRes>;
  updateUser(data: UpdateUserReq): Promise<UpdateUserRes>;
}

export default (axios: AxiosInstance): AdminAPI => ({
  getCommission: async () => {
    const resp = await axios.get<CommissionRes>(endpoints.admin.getCommission);
    return resp.data;
  },
  postCommission: async (data) => {
    const resp = await axios.post<NewCommissionRes>(endpoints.admin.newCommission, data);
    return resp.data;
  },
  delCommission: async (code) => {
    const resp = await axios.delete<DelCommissionRes>(endpoints.admin.delCommission(code));
    return resp.data;
  },
  resetPassUser: async (data) => {
    const resp = await axios.post<ResetPassUserRes>(endpoints.admin.resetPass, data);
    return resp.data;
  },
  updateUser: async (data) => {
    const resp = await axios.put<UpdateUserRes>(endpoints.admin.updateUser, data);
    return resp.data;
  },
});
