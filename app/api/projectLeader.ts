import { AxiosInstance } from 'axios';

import { getKeyValue } from 'utils/function';
import {
  UserProjectsRes,
  NewMemberReq,
  NewMemberRes,
  UploadPercent,
  UpdateProjectReq,
  UpdateProjectRes,
  axiosFormConfig,
} from './types';
import endpoints from './endpoints';

interface ProjectLeaderAPI {
  getProjects(code: string): Promise<UserProjectsRes>;
  postNewMember(data: NewMemberReq, cb: UploadPercent): Promise<NewMemberRes>;
  updateProject(prID: number, data: UpdateProjectReq, cb: UploadPercent): Promise<UpdateProjectRes>;
}

export default (axios: AxiosInstance): ProjectLeaderAPI => ({
  getProjects: async (code) => {
    const resp = await axios.get<UserProjectsRes>(endpoints.projectLeader.getProjects(code));
    return resp.data;
  },
  postNewMember: async (data, cb) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      let value = getKeyValue(data, key as keyof NewMemberReq);
      if (value !== undefined) {
        if (typeof value === 'number') {
          value = value.toString();
        }
        formData.set(key, value);
      }
    });
    const resp = await axios.post<NewMemberRes>(endpoints.projectLeader.postNewMember, formData, axiosFormConfig(cb));
    return resp.data;
  },
  updateProject: async (prID, data, cb) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = getKeyValue(data, key as keyof UpdateProjectReq);
      if (value !== undefined) {
        formData.set(key, value);
      }
    });
    const resp = await axios.post<UpdateProjectRes>(
      endpoints.projectLeader.updateProject(prID),
      formData,
      axiosFormConfig(cb),
    );
    return resp.data;
  },
});
