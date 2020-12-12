import { kea, MakeLogicType } from 'kea';

import api from 'api';
import { Period } from './types';

interface Values {
  items: Period[];
  isFetched: boolean;
  isLoading: boolean;
}

interface Actions {
  getItems: () => void;
  setItems: (items: Period[]) => { items: Period[] };
  addItem: (item: Period) => { item: Period };
  activeItem: (id: number) => { id: number };
  setIsFetched: (value: boolean) => { value: boolean };
  setIsLoading: (value: boolean) => { value: boolean };
}

const initialValues: Values = {
  items: [],
  isLoading: true,
  isFetched: false,
};

const periodLogic = kea<MakeLogicType<Values, Actions>>({
  actions: {
    getItems: true,
    setItems: (items) => ({ items }),
    addItem: (item) => ({ item }),
    activeItem: (id) => ({ id }),
    setIsFetched: (value) => ({ value }),
    setIsLoading: (value) => ({ value }),
  },
  defaults: initialValues,
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
      addItem: (state, { item }) => [...state, item],
      activeItem: (state, { id }) => state.map((p) => ({ ...p, habilitado: p.id === id })),
    },
  },
  listeners: ({ actions }) => ({
    getItems: async () => {
      try {
        const resp = await api.admin.getPeriods();
        actions.setItems(resp.gestiones);
      } catch (e) {
        actions.setIsFetched(false);
        actions.setIsLoading(false);
      }
    },
  }),
});

export default periodLogic;
