import { AxiosInstance } from 'axios';

import endpoints from './endpoints';
import { CommissionRes, NewCommissionReq, NewCommissionRes, DelCommissionRes } from './types';

interface AdminAPI {
  getCommission(): Promise<CommissionRes>;
  postCommission(data: NewCommissionReq): Promise<NewCommissionRes>;
  delCommission(code: string): Promise<DelCommissionRes>;
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
});
