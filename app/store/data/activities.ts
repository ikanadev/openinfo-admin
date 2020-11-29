import { kea, MakeLogicType } from 'kea';

import api from 'api';
import { LeaderProject, Talk } from './types';
import notificationLogic from 'store/notifications';
import { ItemType } from 'types/common';

interface UpdateData {
  id: number;
  habilitado: boolean;
  link: string;
  descripcion: string;
  projectType: ItemType;
}

interface Values {
  concurso: LeaderProject[];
  feria: LeaderProject[];
  talk: Talk[];
  isFetched: boolean;
  isLoading: boolean;
}

interface Actions {
  getData: () => void;
  setConcurso: (items: LeaderProject[]) => { items: LeaderProject[] };
  setFeria: (items: LeaderProject[]) => { items: LeaderProject[] };
  setTalk: (items: Talk[]) => { items: Talk[] };
  updateConcurso: (data: UpdateData) => { data: UpdateData };
  updateFeria: (data: UpdateData) => { data: UpdateData };
  updateTalk: (data: UpdateData) => { data: UpdateData };
  setIsFetched: (value: boolean) => { value: boolean };
  setIsLoading: (value: boolean) => { value: boolean };
}

const initialState: Values = {
  concurso: [],
  feria: [],
  talk: [],
  isFetched: false,
  isLoading: true,
};

const activitiesLogic = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    getData: true,
    setConcurso: (items) => ({ items }),
    setFeria: (items) => ({ items }),
    setTalk: (items) => ({ items }),
    updateConcurso: (data) => ({ data }),
    updateFeria: (data) => ({ data }),
    updateTalk: (data) => ({ data }),
    setIsFetched: (value) => ({ value }),
    setIsLoading: (value) => ({ value }),
  },
  defaults: initialState,
  reducers: {
    isFetched: {
      setIsFetched: (_, { value }) => value,
    },
    isLoading: {
      setIsLoading: (_, { value }) => value,
      getItems: () => true,
    },
    talk: {
      setTalk: (_, { items }) => items,
      updateTalk: (state, { data }) => {
        return state.map((t) => {
          if (t.id === data.id) {
            return { ...t, habilitado: data.habilitado, linkOficial: data.link, descripcion: data.descripcion };
          }
          return t;
        });
      },
    },
    feria: {
      setFeria: (_, { items }) => items,
      updateFeria: (state, { data }) => {
        return state.map((t) => {
          if (t.id === data.id) {
            return {
              ...t,
              habilitado: data.habilitado,
              linkOficial: data.link,
              descripcion: data.descripcion,
              tipoProyecto: data.projectType,
            };
          }
          return t;
        });
      },
    },
    concurso: {
      setConcurso: (_, { items }) => items,
      updateConcurso: (state, { data }) => {
        return state.map((t) => {
          if (t.id === data.id) {
            return {
              ...t,
              habilitado: data.habilitado,
              linkOficial: data.link,
              descripcion: data.descripcion,
              tipoProyecto: data.projectType,
            };
          }
          return t;
        });
      },
    },
  },
  listeners: ({ actions }) => ({
    getData: async () => {
      try {
        const resp = await api.commission.getAllActivities();
        notificationLogic.actions.addSuccess('Hecho!', 'Lista de proyectos y minitalks obtenida');
        actions.setFeria(resp.proyectosFeria);
        actions.setConcurso(resp.proyectosConcurso);
        actions.setTalk(resp.miniTalks);
        actions.setIsFetched(true);
        actions.setIsLoading(false);
      } catch (e) {
        actions.setIsLoading(false);
        actions.setIsFetched(false);
      }
    },
  }),
});

export default activitiesLogic;
