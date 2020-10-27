import { AxiosInstance } from 'axios';

import endpoints from './endpoints';
import { ProjectTypesRes, TeamTypesRes } from './types';

interface CommonAPI {
  getProjectTypes(): Promise<ProjectTypesRes>;
  getTeamTypes(): Promise<TeamTypesRes>;
}

export default (axios: AxiosInstance): CommonAPI => ({
  getProjectTypes: async () => {
    const resp = await axios.get<ProjectTypesRes>(endpoints.common.projectTypes);
    return resp.data;
  },
  getTeamTypes: async () => {
    const resp = await axios.get<TeamTypesRes>(endpoints.common.teamTypes);
    return resp.data;
  },
});
