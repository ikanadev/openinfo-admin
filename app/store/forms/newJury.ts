import { kea, MakeLogicType } from 'kea';

import api from 'api';
import { SearchResult, SearchProjectResult, ItemType } from 'types/common';
import notificationLogic from 'store/notifications';
import juriesLogic from 'store/data/juries';
import { DEFAULT_OPTION } from 'utils/const';
import { GRADOS } from 'utils/const';

interface Values {
  isLoading: boolean;
  form: {
    user: SearchResult | null;
    project: SearchProjectResult | null;
    gradoAcademico: ItemType;
    telefono: string;
  };
}

interface Actions {
  clear: () => void;
  postData: () => void;
  setIsLoading: (value: boolean) => { value: boolean };
  setUser: (user: SearchResult | null) => { user: SearchResult | null };
  setProject: (pr: SearchProjectResult | null) => { pr: SearchProjectResult | null };
  setGrado: (grado: ItemType) => { grado: ItemType };
  setTelf: (num: string) => { num: string };
}

const initialState: Values = {
  isLoading: false,
  form: {
    user: null,
    project: null,
    gradoAcademico: DEFAULT_OPTION,
    telefono: '',
  },
};

const newJuryLogic = kea<MakeLogicType<Values, Actions, null>>({
  connect: [juriesLogic],
  actions: {
    clear: () => true,
    postData: () => true,
    setIsLoading: (value) => ({ value }),
    setUser: (user) => ({ user }),
    setProject: (pr) => ({ pr }),
    setGrado: (grado) => ({ grado }),
    setTelf: (num) => ({ num }),
  },
  defaults: initialState,
  reducers: () => ({
    isLoading: {
      postData: () => true,
      clear: () => false,
      setIsLoading: (_, { value }) => value,
    },
    form: {
      setUser: (state, { user }) => ({ ...state, user }),
      setProject: (state, { pr }) => ({ ...state, project: pr }),
      setGrado: (state, { grado }) => ({ ...state, gradoAcademico: grado }),
      setTelf: (state, { num }) => ({ ...state, telefono: num }),
      clear: () => initialState.form,
    },
  }),
  listeners: ({ actions, values }) => ({
    setUser: ({ user }) => {
      if (!user) return;
      const { items } = juriesLogic.values;
      items.forEach((jury) => {
        if (jury.usuario.codRegistro === user.codRegistro) {
          actions.setTelf(jury.telefono);
          const grado = GRADOS.find((gr) => gr.nombre === jury.gradoAcademico);
          if (grado) {
            actions.setGrado(grado);
          }
        }
      });
    },
    postData: async () => {
      const { form } = values;
      if (form.user === null || form.project === null || form.gradoAcademico.id === 0 || form.telefono === '') {
        notificationLogic.actions.addWarning('Llene los datos', 'Todos los campos son necesarios');
        actions.setIsLoading(false);
        return;
      }
      let exists = false;
      juriesLogic.values.items.forEach((jury) => {
        if (jury.usuario.codRegistro === form.user?.codRegistro) {
          jury.proyectos.forEach((pr) => {
            if (pr.proyecto.id === form.project?.id) {
              exists = true;
            }
          });
        }
      });
      if (exists) {
        notificationLogic.actions.addWarning('Duplicado', 'El usuario ya es jurado del proyecto seleccionado');
        actions.setIsLoading(false);
        return;
      }
      try {
        const resp = await api.commission.postJury({
          codRegistro: form.user.codRegistro,
          idProyecto: form.project.id,
          gradoAcademico: form.gradoAcademico.nombre,
          telefono: form.telefono,
        });
        notificationLogic.actions.addSuccess('Registrado', resp.mensaje);
        actions.clear();
        juriesLogic.actions.addJuryProject(resp);
      } catch (e) {
        actions.setIsLoading(false);
      }
    },
  }),
});

export default newJuryLogic;
