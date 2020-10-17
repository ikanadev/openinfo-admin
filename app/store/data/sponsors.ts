import { kea, MakeLogicType } from 'kea';

import api from 'api';
import notificationLogic from 'store/notifications';
import { Sponsor } from './types';

interface Values {
  items: Sponsor[];
  isFetched: boolean;
  isLoading: boolean;
}
interface Actions {
  getItems: () => void;
  setItems: (items: Sponsor[]) => { items: Sponsor[] };
  addItem: (item: Sponsor) => { item: Sponsor };
  setIsFetched: (value: boolean) => { value: boolean };
  setIsLoading: (value: boolean) => { value: boolean };
}
const initialValue: Values = {
  items: [],
  isFetched: false,
  isLoading: true,
};
const sponsorsLogic = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    getItems: true,
    setItems: (items) => ({ items }),
    addItem: (item) => ({ item }),
    setIsFetched: (value) => ({ value }),
    setIsLoading: (value) => ({ value }),
  },
  defaults: initialValue,
  reducers: {
    items: {
      setItems: (_, { items }) => items,
      addItem: (value, { item }) => [...value, item],
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
        const resp = await api.commission.getSponsors();
        notificationLogic.actions.addSuccess('Obtenido', 'Lista de comisiones');
        actions.setItems(resp.auspiciadores);
      } catch (e) {
        actions.setIsLoading(false);
        actions.setIsFetched(false);
        // errors are hadled by axios interceptors
      }
    },
  }),
});

export default sponsorsLogic;
