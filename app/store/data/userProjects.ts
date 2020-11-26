import { kea, MakeLogicType } from 'kea';

import api from 'api';
import authLogic from 'store/auth';
import { LeaderProject } from './types';
import { Participant } from 'types/common';
import { UpdateProjectRes } from 'api/types';

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
  updateProject: (data: UpdateProjectRes) => { data: UpdateProjectRes };
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
    updateProject: (data) => ({ data }),
  },
  defaults: initialValue,
  reducers: {
    items: {
      setItems: (_, { items }) => items,
      addMember: (state, { member, projID }) => {
        return state.map((pr) => {
          if (pr.id === projID) {
            const project: LeaderProject = { ...pr, participantes: [...pr.participantes, member] };
            return project;
          }
          return pr;
        });
      },
      updateProject: (state, { data: { proyecto } }) => {
        return state.map((pr) => {
          if (pr.id === proyecto.id) {
            const newPr: LeaderProject = {
              id: proyecto.id,
              nombre: proyecto.nombre,
              problematica: proyecto.problematica,
              objetivoGeneral: proyecto.objetivoGeneral,
              objetivosEspecificos: proyecto.objetivosEspecificos.split('_'),
              alcance: proyecto.alcance,
              beneficiarios: proyecto.beneficiarios,
              valorAgregado: proyecto.valorAgregado,
              descripcion: proyecto.descripcion,
              banner: proyecto.banner,
              linkVideo: proyecto.linkVideo,
              linkOficial: pr.linkOficial,
              area: proyecto.area,
              vistas: pr.vistas,
              codigo: pr.codigo,
              habilitado: pr.habilitado,
              tipoProyecto: proyecto.tipoProyecto,
              equipo: pr.equipo,
              gestion: pr.gestion,
              createAt: pr.createAt,
              participantes: pr.participantes,
            };
            return newPr;
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
