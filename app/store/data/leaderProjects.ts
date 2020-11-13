import { kea, MakeLogicType } from 'kea';

import api from 'api';
import authLogic from 'store/auth';
import { LeaderProject } from './types';

interface Values {
  items: LeaderProject[];
  isFetched: boolean;
  isLoading: boolean;
}
interface Actions {
  getItems: () => void;
  setItems: (items: LeaderProject[]) => { items: LeaderProject[] };
  addItem: (item: LeaderProject) => { item: LeaderProject };
  setIsFetched: (value: boolean) => { value: boolean };
  setIsLoading: (value: boolean) => { value: boolean };
}
const initialValue: Values = {
  items: [],
  isFetched: false,
  isLoading: true,
};
const leaderProjectsLogic = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    getItems: true,
    setItems: (items) => ({ items }),
    addItem: (item) => ({ item }),
    setIsFetched: (value) => ({ value }),
    setIsLoading: (value) => ({ value }),
  },
  defaults: initialValue,
  reducers: {
    items: {
      setItems: (_, { items }) => items,
      addItem: (value, { item }) => [...value, item],
    },
    isFetched: {
      setIsFetched: (_, { value }) => value,
      setItems: () => true,
    },
    isLoading: {
      setIsLoading: (_, { value }) => value,
      getItems: () => true,
      setItems: () => false,
    },
  },
  listeners: ({ actions }) => ({
    getItems: async () => {
      try {
        const {
          data: { username },
        } = authLogic.values;
        const resp = await api.teamLeader.getProjects(username);
        actions.setItems(resp.Proyectos);
      } catch (e) {
        actions.setIsLoading(false);
        actions.setIsFetched(false);
      }
    },
  }),
});

export default leaderProjectsLogic;
