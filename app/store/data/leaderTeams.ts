import { kea, MakeLogicType } from 'kea';

import api from 'api';
import { LeaderTeam } from 'types/common';
import authLogic from 'store/auth';

interface Values {
  items: LeaderTeam[];
  isFetched: boolean;
  isLoading: boolean;
}
interface Actions {
  getItems: () => void;
  setItems: (items: LeaderTeam[]) => { items: LeaderTeam[] };
  setIsFetched: (value: boolean) => { value: boolean };
  setIsLoading: (value: boolean) => { value: boolean };
}

const initialState: Values = {
  items: [],
  isFetched: false,
  isLoading: true,
};

const leaderTeamsLogic = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    getItems: true,
    setItems: (items) => ({ items }),
    setIsFetched: (value) => ({ value }),
    setIsLoading: (value) => ({ value }),
  },
  defaults: initialState,
  reducers: {
    items: {
      setItems: (_, { items }) => items,
    },
    isFetched: {
      setIsFetched: (_, { value }) => value,
      setItems: () => true,
    },
    isLoading: {
      setIsLoading: (_, { value }) => value,
      setItems: () => false,
      getItems: () => true,
    },
  },
  listeners: ({ actions }) => ({
    getItems: async () => {
      try {
        const {
          data: { username },
        } = authLogic.values;
        const resp = await api.teamLeader.getTeams(username);
        actions.setItems(resp.equipos);
      } catch (e) {
        actions.setIsLoading(false);
        actions.setIsFetched(false);
        // errors are handled by axios interceptors
      }
    },
  }),
});

export default leaderTeamsLogic;
