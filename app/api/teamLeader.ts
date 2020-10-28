import { AxiosInstance } from 'axios';

import endpoints from './endpoints';
import { LeaderTeamsRes, NewProjectReq, NewProjectRes } from './types';

interface TeamLeaderAPI {
  getTeams(code: string): Promise<LeaderTeamsRes>;
  postTeam(data: NewProjectReq): Promise<NewProjectRes>;
}

export default (axios: AxiosInstance): TeamLeaderAPI => ({
  getTeams: async (code) => {
    const resp = await axios.get<LeaderTeamsRes>(endpoints.teamLeader.getTeams(code));
    return resp.data;
  },
  postTeam: async (data) => {
    const resp = await axios.post<NewProjectRes>(endpoints.teamLeader.postProject, data);
    return resp.data;
  },
});
