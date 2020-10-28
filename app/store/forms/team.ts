import { kea, MakeLogicType } from 'kea';

import api from 'api';
import notificationLogic from 'store/notifications';
import teamsLogic from 'store/data/teams';
import { SearchResult, ItemType } from 'types/common';
import { DEFAULT_OPTION } from 'utils/const';

interface Values {
  isLoading: boolean;
  form: {
    selectedUser: SearchResult | null;
    groupName: string;
    selectedTeamType: ItemType;
  };
}
interface Actions {
  clear: () => void;
  postData: () => void;
  setIsLoading: (value: boolean) => { value: boolean };
  setUser: (user: SearchResult) => { user: SearchResult };
  setGroupName: (value: string) => { value: string };
  setTeamType: (item: ItemType) => { item: ItemType };
}
const initialState: Values = {
  isLoading: false,
  form: {
    selectedUser: null,
    groupName: '',
    selectedTeamType: DEFAULT_OPTION,
  },
};

const teamFormLogic = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    clear: true,
    postData: true,
    setIsLoading: (value) => ({ value }),
    setUser: (user) => ({ user }),
    setGroupName: (value) => ({ value }),
    setTeamType: (item) => ({ item }),
  },
  defaults: initialState,
  reducers: {
    isLoading: {
      postData: () => true,
      clear: () => false,
      setIsLoading: (_, { value }) => value,
    },
    form: {
      clear: () => initialState.form,
      setUser: (state, { user }) => ({ ...state, selectedUser: user }),
      setGroupName: (state, { value }) => ({ ...state, groupName: value }),
      setTeamType: (state, { item }) => ({ ...state, selectedTeamType: item }),
    },
  },
  listeners: ({ actions, values }) => ({
    postData: async () => {
      const { form } = values;
      if (form.groupName === '' || form.selectedTeamType.id === 0 || form.selectedUser === null) {
        notificationLogic.actions.addWarning('Datos incompletos', 'Seleccione un nombre, un tipo y un encargado');
        actions.setIsLoading(false);
        return;
      }
      try {
        const resp = await api.commission.postTeam({
          codRegistro: form.selectedUser.codRegistro,
          idTipoEquipo: form.selectedTeamType.id,
          nombre: form.groupName,
        });
        notificationLogic.actions.addSuccess('Registrado', 'Nuevo equipo registrado');
        teamsLogic.actions.addItem(
          {
            idEquipo: resp.equipo.idEquipo,
            nombre: resp.equipo.nombre,
            encargado: resp.equipo.encargado,
          },
          resp.equipo.tipoEquipo,
        );
        actions.clear();
      } catch (e) {
        actions.setIsLoading(false);
      }
    },
  }),
});

export default teamFormLogic;
