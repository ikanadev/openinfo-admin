import { AxiosInstance } from 'axios';

import { getKeyValue } from 'utils/function';
import endpoints from './endpoints';
import { GetSponsorsRes, PostSponsorReq, PostSponsorRes, axiosFormConfig, UploadPercent } from './types';

interface CommissionAPI {
  postSponsor(data: PostSponsorReq, cb: UploadPercent): Promise<PostSponsorRes>;
  getSponsors(): Promise<GetSponsorsRes>;
}

export default (axios: AxiosInstance): CommissionAPI => ({
  postSponsor: async (data, cb) => {
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
  getSponsors: async () => {
    const resp = await axios.get<GetSponsorsRes>(endpoints.commission.getSponsors);
    return resp.data;
  },
});
