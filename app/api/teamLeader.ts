import { AxiosInstance } from 'axios';

import endpoints from './endpoints';
import { LeaderTeamsRes, NewProjectReq, NewProjectRes, LeaderProjectsRes } from './types';

interface TeamLeaderAPI {
  getTeams(code: string): Promise<LeaderTeamsRes>;
  postProject(data: NewProjectReq): Promise<NewProjectRes>;
  getProjects(code: string): Promise<LeaderProjectsRes>;
}

export default (axios: AxiosInstance): TeamLeaderAPI => ({
  getTeams: async (code) => {
    const resp = await axios.get<LeaderTeamsRes>(endpoints.teamLeader.getTeams(code));
    return resp.data;
  },
  postProject: async (data) => {
    const resp = await axios.post<NewProjectRes>(endpoints.teamLeader.postProject, data);
    return resp.data;
  },
  getProjects: async (code) => {
    const resp = await axios.get<LeaderProjectsRes>(endpoints.teamLeader.getProjects(code));
    return resp.data;
  },
});
