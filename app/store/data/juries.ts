import { kea, MakeLogicType } from 'kea';

import api from 'api';
import { NewJuryRes } from 'api/types';
import { JuryStore } from './types';

interface Values {
  items: JuryStore[];
  isFetched: boolean;
  isLoading: boolean;
}

interface Actions {
  getItems: () => void;
  setItems: (items: JuryStore[]) => { items: JuryStore[] };
  addJuryProject: (data: NewJuryRes) => { data: NewJuryRes };
  setIsFetched: (value: boolean) => { value: boolean };
  setIsLoading: (value: boolean) => { value: boolean };
}

const initialValue: Values = {
  items: [],
  isFetched: false,
  isLoading: true,
};

const juriesLogic = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    getItems: true,
    setItems: (items) => ({ items }),
    setIsFetched: (value) => ({ value }),
    setIsLoading: (value) => ({ value }),
  },
  defaults: initialValue,
  reducers: {
    isFetched: {
      setIsFetched: (_, { value }) => value,
      setItems: () => true,
    },
    isLoading: {
      setIsLoading: (_, { value }) => value,
      getItems: () => true,
      setItems: () => false,
    },
    items: {
      setItems: (_, { items }) => items,
      addJuryProject: (state, { data }) => {
        let isNew = true;
        const { registroJurado } = data;
        const newProject = {
          id: registroJurado.id,
          proyecto: registroJurado.proyecto,
          innovacion: registroJurado.innovacion,
          impacto: registroJurado.impacto,
          funcionalidad: registroJurado.funcionalidad,
          ux: registroJurado.ux,
          presentacion: registroJurado.presentacion,
        };
        const items = state.map(
          (it): JuryStore => {
            if (it.id === registroJurado.jurado.id) {
              isNew = false;
              return {
                ...it,
                gradoAcademico: registroJurado.jurado.gradoAcademico,
                telefono: registroJurado.jurado.telefono,
                proyectos: [...it.proyectos, newProject],
              };
            }
            return it;
          },
        );
        if (isNew) {
          items.push({
            id: registroJurado.jurado.id,
            gradoAcademico: registroJurado.jurado.gradoAcademico,
            telefono: registroJurado.jurado.telefono,
            usuario: registroJurado.jurado.usuario,
            proyectos: [newProject],
          });
        }
        return items;
      },
    },
  },
  listeners: ({ actions }) => ({
    getItems: async () => {
      try {
        const resp = await api.commission.getJuries();
        actions.setItems(resp.jurados);
      } catch (e) {
        actions.setIsLoading(false);
        actions.setIsFetched(false);
      }
    },
  }),
});

export default juriesLogic;
