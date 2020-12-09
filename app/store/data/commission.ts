import { kea, MakeLogicType } from 'kea';

import api from 'api';
import { Commission } from './types';

interface Values {
  items: Commission[];
  isFetched: boolean;
  isLoading: boolean;
}

interface Actinos {
  getItems: () => void;
  setItems: (items: Commission[]) => { items: Commission[] };
  addItem: (item: Commission) => { item: Commission };
  delItem: (code: string) => { code: string };
  setIsFetched: (value: boolean) => { value: boolean };
  setIsLoading: (value: boolean) => { value: boolean };
}

const initialValues: Values = {
  items: [],
  isFetched: false,
  isLoading: true,
};

const commissionLogic = kea<MakeLogicType<Values, Actinos, null>>({
  actions: {
    getItems: true,
    setItems: (items) => ({ items }),
    addItem: (item) => ({ item }),
    delItem: (code) => ({ code }),
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
      delItem: (state, { code }) => state.filter((item) => item.codRegistro !== code),
    },
  },
  listeners: ({ actions }) => ({
    getItems: async () => {
      try {
        const resp = await api.admin.getCommission();
        actions.setItems(resp.comision);
      } catch (e) {
        actions.setIsLoading(false);
        actions.setIsFetched(false);
      }
    },
  }),
});

export default commissionLogic;
