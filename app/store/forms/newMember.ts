import { kea, MakeLogicType } from 'kea';

import api from 'api';
import { SearchResult, ItemType } from 'types/common';
import { DEFAULT_OPTION, EmpyFile } from 'utils/const';
import notificationLogic from 'store/notifications';
import userProjectsLogic from 'store/data/userProjects';

interface Values {
  form: {
    ci: string;
    foto: File;
    gradoAcademico: ItemType;
    telefono: string;
    contacto2: string;
    contacto3: string;
    descripcion: string;
    selectedUser: SearchResult | null;
  };
  isLoading: boolean;
  percentUploaded: number;
}
interface Actions {
  clear: () => void;
  postData: (prID: number) => { prID: number };
  setIsLoading: (value: boolean) => { value: boolean };
  setPercent: (percent: number) => { percent: number };
  setCI: (value: string) => { value: string };
  setFoto: (file: File) => { file: File };
  setGradoAc: (grado: ItemType) => { grado: ItemType };
  setTelefono: (num: string) => { num: string };
  setContacto2: (value: string) => { value: string };
  setContacto3: (value: string) => { value: string };
  setDescripcion: (value: string) => { value: string };
  setUser: (user: SearchResult) => { user: SearchResult };
}
const initialState: Values = {
  isLoading: false,
  percentUploaded: 0,
  form: {
    ci: '',
    foto: EmpyFile,
    gradoAcademico: DEFAULT_OPTION,
    telefono: '',
    contacto2: '',
    contacto3: '',
    descripcion: '',
    selectedUser: null,
  },
};

const newMemberLogic = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    clear: true,
    postData: (prID) => ({ prID }),
    setIsLoading: (value) => ({ value }),
    setPercent: (percent) => ({ percent }),
    setCI: (value) => ({ value }),
    setFoto: (file) => ({ file }),
    setGradoAc: (grado) => ({ grado }),
    setTelefono: (num) => ({ num }),
    setContacto2: (value) => ({ value }),
    setContacto3: (value) => ({ value }),
    setDescripcion: (value) => ({ value }),
    setUser: (user) => ({ user }),
  },
  defaults: initialState,
  reducers: {
    isLoading: {
      postData: () => true,
      clear: () => false,
      setIsLoading: (_, { value }) => value,
    },
    form: {
      setCI: (state, { value }) => ({ ...state, ci: value }),
      setFoto: (state, { file }) => ({ ...state, foto: file }),
      setGradoAc: (state, { grado }) => ({ ...state, gradoAcademico: grado }),
      setTelefono: (state, { num }) => ({ ...state, telefono: num }),
      setContacto2: (state, { value }) => ({ ...state, contacto2: value }),
      setContacto3: (state, { value }) => ({ ...state, contacto3: value }),
      setDescripcion: (state, { value }) => ({ ...state, descripcion: value }),
      setUser: (state, { user }) => ({ ...state, selectedUser: user }),
      clear: () => initialState.form,
    },
    percentUploaded: {
      clear: () => 0,
      setPercent: (_, { percent }) => percent,
    },
  },
  listeners: ({ actions, values }) => ({
    postData: async ({ prID }) => {
      const { form } = values;
      if (
        form.foto.size === 0 ||
        !form.ci ||
        !form.telefono ||
        !form.selectedUser ||
        form.gradoAcademico === DEFAULT_OPTION
      ) {
        notificationLogic.actions.addWarning(
          'Llene los campos necesarios',
          'Foto, CI, teléfono, grado y usuario con requeridos',
        );
        actions.setIsLoading(false);
        return;
      }
      try {
        const resp = await api.projectLeader.postNewMember(
          {
            ci: form.ci,
            foto: form.foto,
            gradoAcademico: form.gradoAcademico.nombre,
            telefono: form.telefono,
            contacto2: form.contacto2,
            contacto3: form.contacto3,
            descripcion: form.descripcion,
            codRegistro: form.selectedUser.codRegistro,
            idProyecto: prID,
          },
          (percent) => {
            actions.setPercent(percent);
          },
        );
        notificationLogic.actions.addSuccess('Registrado', 'Participante agregado');
        actions.clear();
        userProjectsLogic.actions.addMember(resp.participante, resp.proyecto.id);
      } catch (e) {
        actions.setIsLoading(false);
        actions.setPercent(initialState.percentUploaded);
      }
    },
  }),
});

export default newMemberLogic;
