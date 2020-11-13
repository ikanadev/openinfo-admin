import { kea, MakeLogicType } from 'kea';

import api from 'api';
import authLogic from 'store/auth';
import { LeaderProject } from './types';
import { Participant } from 'types/common';

interface Values {
  items: LeaderProject[];
  isFetched: boolean;
  isLoading: boolean;
}
interface Actions {
  getItems: () => void;
  setItems: (items: LeaderProject[]) => { items: LeaderProject[] };
  setIsFetched: (value: boolean) => { value: boolean };
  setIsLoading: (value: boolean) => { value: boolean };
  addMember: (member: Participant, projID: number) => { member: Participant; projID: number };
}
const initialValue: Values = {
  items: [],
  isFetched: false,
  isLoading: true,
};
const userProjectsLogic = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    getItems: true,
    setItems: (items) => ({ items }),
    setIsFetched: (value) => ({ value }),
    setIsLoading: (value) => ({ value }),
    addMember: (member, projID) => ({ member, projID }),
  },
  defaults: initialValue,
  reducers: {
    items: {
      setItems: (_, { items }) => items,
      addMember: (state, { member, projID }) => {
        return state.map((pr) => {
          if (pr.id.toString() === projID.toString()) {
            const project: LeaderProject = { ...pr, participantes: [...pr.participantes, member] };
            return project;
          }
          return pr;
        });
      },
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
        const resp = await api.projectLeader.getProjects(username);
        actions.setItems(resp.proyectos);
      } catch (e) {
        actions.setIsLoading(false);
        actions.setIsFetched(false);
      }
    },
  }),
});

export default userProjectsLogic;
