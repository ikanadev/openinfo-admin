import { AxiosInstance } from 'axios';

import { getKeyValue } from 'utils/function';
import endpoints from './endpoints';
import { PostSponsorReq, PostSponsorRes, axiosFormConfig, UploadPercent } from './types';

interface CommissionAPI {
  uploadFile(data: PostSponsorReq, cb: UploadPercent): Promise<PostSponsorRes>;
}

export default (axios: AxiosInstance): CommissionAPI => ({
  uploadFile: async (data, cb) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = getKeyValue(data, key as keyof PostSponsorReq);
      if (value !== undefined) {
        formData.set(key, value);
      }
    });
    const resp = await axios.post<PostSponsorRes>(endpoints.commission.postSponsor, formData, axiosFormConfig(cb));
    return resp.data;
  },
});
