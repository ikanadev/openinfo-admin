import { kea, MakeLogicType } from 'kea';

import authLogic from 'store/auth';
import { Notification, NotifTypes } from './types';

interface Values {
  items: Notification[];
}
type AddNotifActionPayload = { title: string; message: string };
interface Actions {
  addSuccess: (title: string, message: string) => AddNotifActionPayload;
  addInfo: (title: string, message: string) => AddNotifActionPayload;
  addWarning: (title: string, message: string) => AddNotifActionPayload;
  addError: (title: string, message: string) => AddNotifActionPayload;
  remove: (id: string) => { id: string };
}

const genID = () => new Date().getTime().toString().substr(-5);

const notificationLogic = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    addSuccess: (title, message) => ({ title, message }),
    addInfo: (title, message) => ({ title, message }),
    addWarning: (title, message) => ({ title, message }),
    addError: (title, message) => ({ title, message }),
    remove: (id) => ({ id }),
  },
  defaults: {
    items: [],
  },
  reducers: {
    items: {
      addSuccess: (notifs, { title, message }) => {
        const newItem: Notification = { id: genID(), title, message, type: NotifTypes.Success };
        return [...notifs, newItem];
      },
      addInfo: (notifs, { title, message }) => {
        const newItem: Notification = { id: genID(), title, message, type: NotifTypes.Info };
        return [...notifs, newItem];
      },
      addWarning: (notifs, { title, message }) => {
        const newItem: Notification = { id: genID(), title, message, type: NotifTypes.Warning };
        return [...notifs, newItem];
      },
      addError: (notifs, { title, message }) => {
        const newItem: Notification = { id: genID(), title, message, type: NotifTypes.Error };
        return [...notifs, newItem];
      },
      remove: (notifs, { id }) => notifs.filter((notif) => notif.id !== id),
    },
  },
  listeners: ({ actions }) => ({
    [(authLogic.actions.saveToken as unknown) as string]: () => {
      actions.addInfo('Usuario verificado', 'Obteniendo datos de usuario');
    },
    [(authLogic.actions.setLoggedData as unknown) as string]: () => {
      actions.addSuccess('Hecho!', 'Bienvenido al panel de administración');
    },
  }),
});

export default notificationLogic;
