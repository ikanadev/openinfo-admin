import { kea, MakeLogicType } from 'kea';

import api from 'api';
import { SearchResult, ProjectType, ItemType } from 'types/common';
import { DEFAULT_OPTION } from 'utils/const';
import notificationLogic from 'store/notifications';
import leaderProjectsLogic from 'store/data/leaderProjects';

interface Values {
  isLoading: boolean;
  form: {
    name: string;
    area: ProjectType;
    selectedUser: SearchResult | null;
    selectedTeam: ItemType;
  };
}
interface Actions {
  clear: () => void;
  postData: () => void;
  setIsLoading: (value: boolean) => { value: boolean };
  setName: (value: string) => { value: string };
  setUser: (user: SearchResult) => { user: SearchResult };
  setTeam: (team: ItemType) => { team: ItemType };
  setArea: (value: ProjectType) => { value: ProjectType };
}
const initialState: Values = {
  isLoading: false,
  form: {
    name: '',
    area: ProjectType.feria,
    selectedUser: null,
    selectedTeam: DEFAULT_OPTION,
  },
};

const newProjectLogic = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    clear: () => true,
    postData: () => true,
    setIsLoading: (value) => ({ value }),
    setName: (value) => ({ value }),
    setUser: (user) => ({ user }),
    setTeam: (team) => ({ team }),
    setArea: (value) => ({ value }),
  },
  defaults: initialState,
  reducers: {
    isLoading: {
      postData: () => true,
      clear: () => false,
      setIsLoading: (_, { value }) => value,
    },
    form: {
      setName: (state, { value }) => ({ ...state, name: value }),
      setUser: (state, { user }) => ({ ...state, selectedUser: user }),
      setTeam: (state, { team }) => ({ ...state, selectedTeam: team }),
      setArea: (state, { value }) => ({ ...state, area: value }),
      clear: () => initialState.form,
    },
  },
  listeners: ({ actions, values }) => ({
    postData: async () => {
      const {
        form: { name, area, selectedUser, selectedTeam },
      } = values;
      if (name === '' || selectedUser === null || selectedTeam === DEFAULT_OPTION) {
        notificationLogic.actions.addWarning('Formulario incompleto', 'Llene y seleccione todos los datos');
        actions.setIsLoading(false);
        return;
      }
      try {
        const resp = await api.teamLeader.postProject({
          area,
          codJefeProyecto: selectedUser.codRegistro,
          idEquipo: selectedTeam.id,
          nombre: name,
        });
        notificationLogic.actions.addSuccess('Hecho!', 'Nuevo proyecto registrado');
        leaderProjectsLogic.actions.addItem(resp.proyecto);
        actions.clear();
      } catch (e) {
        actions.setIsLoading(false);
      }
    },
  }),
});

export default newProjectLogic;
