import { kea, MakeLogicType } from 'kea';

import api from 'api';
import { TeamStore } from './types';
import notificationLogic from 'store/notifications';
import { Team, ItemType } from 'types/common';

interface Values {
  items: TeamStore[];
  isFetched: boolean;
  isLoading: boolean;
}
interface Actions {
  getItems: () => void;
  setItems: (items: TeamStore[]) => { items: TeamStore[] };
  addItem: (team: Team, teamType: ItemType) => { team: Team; teamType: ItemType };
  setIsFetched: (value: boolean) => { value: boolean };
  setIsLoading: (value: boolean) => { value: boolean };
}
const initialValues: Values = {
  items: [],
  isFetched: false,
  isLoading: true,
};

const teamsLogic = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    getItems: true,
    setItems: (items) => ({ items }),
    addItem: (team, teamType) => ({ team, teamType }),
    setIsFetched: (value) => ({ value }),
    setIsLoading: (value) => ({ value }),
  },
  defaults: initialValues,
  reducers: {
    items: {
      setItems: (_, { items }) => items,
      addItem: (value, { team, teamType }) => {
        const indexOfType = value.findIndex((item) => item.id === teamType.id);
        if (indexOfType === -1) {
          const newItem: TeamStore = {
            id: teamType.id,
            nombre: teamType.nombre,
            equipos: [team],
          };
          return [...value, newItem];
        }
        const items = [...value];
        items[indexOfType] = { ...items[indexOfType], equipos: [...items[indexOfType].equipos, team] };
        return items;
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
        const resp = await api.commission.getTeams();
        notificationLogic.actions.addSuccess('Obtenido', 'Lista de equipos');
        actions.setItems(resp.tipoEquipos);
      } catch (e) {
        actions.setIsLoading(false);
        actions.setIsFetched(false);
        // errors are handled by axios interceptors
      }
    },
  }),
});

export default teamsLogic;
