import { AxiosInstance, CancelToken } from 'axios';

import { getKeyValue } from 'utils/function';
import endpoints from './endpoints';
import {
  GetSponsorsRes,
  PostSponsorReq,
  PostSponsorRes,
  axiosFormConfig,
  UploadPercent,
  SearchUserRes,
  NewTeamReq,
  NewTeamRes,
  TeamsRes,
  SearchProjectRes,
  NewJuryReq,
  NewJuryRes,
  JuriesRes,
  GradeReq,
  GradeRes,
} from './types';

interface CommissionAPI {
  postSponsor(data: PostSponsorReq, cb: UploadPercent): Promise<PostSponsorRes>;
  getSponsors(): Promise<GetSponsorsRes>;
  searchUser(term: string, calcelToken: CancelToken): Promise<SearchUserRes>;
  postTeam(data: NewTeamReq): Promise<NewTeamRes>;
  getTeams(): Promise<TeamsRes>;
  searchProject(term: string, cancelToken: CancelToken): Promise<SearchProjectRes>;
  postJury(data: NewJuryReq): Promise<NewJuryRes>;
  getJuries(): Promise<JuriesRes>;
  postGrade(data: GradeReq): Promise<GradeRes>;
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
  searchUser: async (term, cancelToken) => {
    const resp = await axios.get<SearchUserRes>(endpoints.commission.searchUser(term), { cancelToken });
    return resp.data;
  },
  postTeam: async (data) => {
    const resp = await axios.post<NewTeamRes>(endpoints.commission.postTeam, data);
    return resp.data;
  },
  getTeams: async () => {
    const resp = await axios.get<TeamsRes>(endpoints.commission.getTeams);
    return resp.data;
  },
  searchProject: async (term, cancelToken) => {
    const resp = await axios.get<SearchProjectRes>(endpoints.commission.searchProject(term), { cancelToken });
    return resp.data;
  },
  postJury: async (data) => {
    const resp = await axios.post<NewJuryRes>(endpoints.commission.newJury, data);
    return resp.data;
  },
  getJuries: async () => {
    const resp = await axios.get<JuriesRes>(endpoints.commission.juries);
    return resp.data;
  },
  postGrade: async (data) => {
    const resp = await axios.post<GradeRes>(endpoints.commission.grade, data);
    return resp.data;
  },
});
