import { kea, MakeLogicType } from 'kea';

import api from 'api';
import { ItemType } from 'types/common';

interface Values {
  projectTypes: ItemType[];
  teamTypes: ItemType[];
  isLoading: boolean;
  error: boolean;
}
interface Actions {
  getData: () => void;
  setProjectTypes: (items: ItemType[]) => { items: ItemType[] };
  setTeamTypes: (items: ItemType[]) => { items: ItemType[] };
  setIsLoading: (value: boolean) => { value: boolean };
  setError: (value: boolean) => { value: boolean };
}
const initialState: Values = {
  projectTypes: [],
  teamTypes: [],
  isLoading: true,
  error: false,
};

const siteDataLogic = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    getData: true,
    setProjectTypes: (items) => ({ items }),
    setTeamTypes: (items) => ({ items }),
    setIsLoading: (value) => ({ value }),
    setError: (value) => ({ value }),
  },
  defaults: initialState,
  reducers: {
    projectTypes: {
      setProjectTypes: (_, { items }) => items,
    },
    teamTypes: {
      setTeamTypes: (_, { items }) => items,
    },
    isLoading: {
      setIsLoading: (_, { value }) => value,
      getData: () => true,
    },
    error: {
      setError: (_, { value }) => value,
    },
  },
  listeners: ({ actions }) => ({
    getData: async () => {
      try {
        const [pTypes, tTypes] = await Promise.all([api.common.getProjectTypes(), api.common.getTeamTypes()]);
        actions.setProjectTypes(pTypes.tipoProyectos);
        actions.setTeamTypes(tTypes.tipoEquipos);
        actions.setIsLoading(false);
      } catch (e) {
        actions.setError(true);
      }
    },
  }),
});

export default siteDataLogic;
