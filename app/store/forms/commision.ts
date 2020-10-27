import { kea, MakeLogicType } from 'kea';

import api from 'api';
import notifLogic from 'store/notifications';
import sponsorsLogic from 'store/data/sponsors';
import { EmpyFile } from 'utils/const';
import { NewSponsorForm } from './types';

interface Values {
  isLoading: boolean;
  form: NewSponsorForm;
  percentUploaded: number;
}

interface Actions {
  clear: () => void;
  setName: (value: string) => { value: string };
  setWebsite: (value: string) => { value: string };
  setDescription: (value: string) => { value: string };
  setContact: (value: string) => { value: string };
  setImage: (file: File) => { file: File };
  setImageURL: (value: string) => { value: string };
  setLoading: (value: boolean) => { value: boolean };
  setPercent: (value: number) => { value: number };
  postData: () => void;
}

const initialState: Values = {
  isLoading: false,
  percentUploaded: 0,
  form: {
    name: '',
    website: '',
    description: '',
    contact: '',
    image: EmpyFile,
    imageURL: '',
  },
};

const commissionLogic = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    clear: true,
    setName: (value) => ({ value }),
    setWebsite: (value) => ({ value }),
    setDescription: (value) => ({ value }),
    setContact: (value) => ({ value }),
    setImage: (file) => ({ file }),
    setImageURL: (value) => ({ value }),
    setLoading: (value) => ({ value }),
    setPercent: (value) => ({ value }),
    postData: true,
  },
  defaults: initialState,
  reducers: {
    isLoading: {
      postData: () => true,
      clear: () => initialState.isLoading,
      setLoading: (_, { value }) => value,
    },
    percentUploaded: {
      setPercent: (_, { value }) => value,
      clear: () => initialState.percentUploaded,
    },
    form: {
      setName: (state, { value }) => ({ ...state, name: value }),
      setWebsite: (state, { value }) => ({ ...state, website: value }),
      setDescription: (state, { value }) => ({ ...state, description: value }),
      setContact: (state, { value }) => ({ ...state, contact: value }),
      setImage: (state, { file }) => ({ ...state, image: file }),
      setImageURL: (state, { value }) => ({ ...state, imageURL: value }),
      clear: () => initialState.form,
    },
  },
  listeners: ({ actions, values }) => ({
    postData: async () => {
      const { form } = values;
      if (form.image.size === 0 || form.name.length === 0 || form.contact.length === 0) {
        notifLogic.actions.addWarning('Llene los campos', 'Imagen, nombre y contacto son requeridos.');
        actions.setLoading(false);
        return;
      }
      try {
        const resp = await api.commission.postSponsor(
          {
            nombre: form.name,
            contacto: form.contact,
            descripcion: form.description,
            linkPagina: form.website,
            logo: form.image,
          },
          (percent) => {
            actions.setPercent(percent);
          },
        );
        notifLogic.actions.addSuccess('Registrado', resp.mensaje);
        actions.clear();
        sponsorsLogic.actions.addItem(resp.auspiciador);
      } catch (e) {
        actions.setLoading(false);
        actions.setPercent(initialState.percentUploaded);
        // errors are handled in axios response interceptor
      }
    },
  }),
});

export default commissionLogic;
