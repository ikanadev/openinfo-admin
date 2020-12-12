import api from 'api';
import { kea, MakeLogicType } from 'kea';

import periodLogic from 'store/data/period';
import notificationLogic from 'store/notifications';
import { DateInput, ItemType } from 'types/common';
import { DEFAULT_OPTION } from 'utils/const';

interface Values {
  form: {
    start: DateInput;
    end: DateInput;
    period: ItemType;
  };
  isLoading: boolean;
}

interface Actions {
  clear: () => void;
  postData: () => void;
  setIsLoading: (value: boolean) => { value: boolean };
  setStart: (date: DateInput) => { date: DateInput };
  setEnd: (date: DateInput) => { date: DateInput };
  setPeriod: (value: ItemType) => { value: ItemType };
}

const initial: Values = {
  form: {
    start: { year: '', month: '', day: '' },
    end: { year: '', month: '', day: '' },
    period: DEFAULT_OPTION,
  },
  isLoading: false,
};

const isValidDate = (date: DateInput): boolean => {
  if (date.year.length !== 4 || date.month.length !== 2 || date.day.length !== 2) return false;
  return true;
};

const newPeriodLogi = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    clear: true,
    postData: true,
    setIsLoading: (value) => ({ value }),
    setStart: (date) => ({ date }),
    setEnd: (date) => ({ date }),
    setPeriod: (value) => ({ value }),
  },
  defaults: initial,
  reducers: {
    isLoading: {
      postData: () => true,
      clear: () => false,
      setIsLoading: (_, { value }) => value,
    },
    form: {
      setStart: (state, { date }) => ({ ...state, start: date }),
      setEnd: (state, { date }) => ({ ...state, end: date }),
      setPeriod: (state, { value }) => ({ ...state, period: value }),
      clear: () => initial.form,
    },
  },
  listeners: ({ actions, values }) => ({
    postData: async () => {
      const { form } = values;
      if (!isValidDate(form.start) || !isValidDate(form.end)) {
        notificationLogic.actions.addWarning('Corrija las fechas', 'Debe ser de la forma YYYY MM DD, ej. 2000 01 22');
        actions.setIsLoading(false);
        return;
      }
      if (form.period.id === 0) {
        notificationLogic.actions.addWarning('Selecciones un periodo', 'Periodo es requerido');
        actions.setIsLoading(false);
        return;
      }
      try {
        const resp = await api.admin.postPeriod({
          fechaIni: `${form.start.year}/${form.start.month}/${form.start.day}`,
          fechaFin: `${form.end.year}/${form.end.month}/${form.end.day}`,
          periodo: (form.period.nombre as 'I') || 'II',
        });
        notificationLogic.actions.addSuccess('Hecho!', 'Nuevo periodo registrado');
        actions.clear();
        periodLogic.actions.addItem(resp.gestion);
      } catch (e) {
        actions.setIsLoading(false);
      }
    },
  }),
});

export default newPeriodLogi;
