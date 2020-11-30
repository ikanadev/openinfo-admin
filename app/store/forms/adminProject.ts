import { kea, MakeLogicType } from 'kea';

import api from 'api';
import notificationLogic from 'store/notifications';
import { ItemType, ProjectType } from 'types/common';
import { DEFAULT_OPTION } from 'utils/const';
import activitiesLogic from 'store/data/activities';

interface FormData {
  project: ItemType;
  projectType: ItemType;
  description: string;
  linkOficial: string;
  habilitado: boolean;
  area: ProjectType;
  areaProyecto: ProjectType;
}
interface Values {
  form: FormData;
  isLoading: boolean;
  showForm: boolean;
}

interface Actions {
  setForm: (data: FormData) => { data: FormData };
  setDesc: (value: string) => { value: string };
  setLink: (value: string) => { value: string };
  setHabilitado: (value: boolean) => { value: boolean };
  setProjectType: (value: ItemType) => { value: ItemType };
  setAreaProject: (value: ProjectType) => { value: ProjectType };
  openForm: () => void;
  closeForm: () => void;
  postData: () => void;
  setIsLoading: (value: boolean) => { value: boolean };
}

const initialState: Values = {
  form: {
    project: DEFAULT_OPTION,
    projectType: DEFAULT_OPTION,
    description: '',
    linkOficial: '',
    habilitado: false,
    area: ProjectType.feria,
    areaProyecto: ProjectType.feria,
  },
  isLoading: false,
  showForm: false,
};

const adminProjectLogic = kea<MakeLogicType<Values, Actions>>({
  actions: {
    setForm: (data) => ({ data }),
    setDesc: (value) => ({ value }),
    setLink: (value) => ({ value }),
    setHabilitado: (value) => ({ value }),
    setProjectType: (value) => ({ value }),
    setAreaProject: (value) => ({ value }),
    openForm: true,
    closeForm: true,
    postData: true,
    setIsLoading: (value) => ({ value }),
  },
  defaults: initialState,
  reducers: {
    isLoading: {
      postData: () => true,
      closeForm: () => false,
      setIsLoading: (_, { value }) => value,
    },
    showForm: {
      openForm: () => true,
      closeForm: () => false,
    },
    form: {
      setForm: (_, { data }) => data,
      setDesc: (state, { value }) => ({ ...state, description: value }),
      setLink: (state, { value }) => ({ ...state, linkOficial: value }),
      setProjectType: (state, { value }) => ({ ...state, projectType: value }),
      setHabilitado: (state, { value }) => ({ ...state, habilitado: value }),
      setAreaProject: (state, { value }) => ({ ...state, areaProyecto: value }),
    },
  },
  listeners: ({ actions, values }) => ({
    postData: async () => {
      const { form } = values;
      if ((form.area === ProjectType.feria || form.area === ProjectType.concurso) && form.projectType.id === 0) {
        notificationLogic.actions.addWarning('Seleccione categoria del proyecto', '');
        actions.setIsLoading(false);
        return;
      }
      try {
        await api.commission.updateActivity({
          area: form.area,
          descripcion: form.description,
          habilitado: form.habilitado,
          idProyecto: form.project.id,
          idTipoProyecto: form.projectType.id,
          linkOficial: form.linkOficial,
          areaProyecto: form.areaProyecto,
        });
        notificationLogic.actions.addSuccess('Hecho!', 'Proyecto actualizado');
        actions.closeForm();
        const dataToUpdate = {
          id: form.project.id,
          descripcion: form.description,
          habilitado: form.habilitado,
          link: form.linkOficial,
          projectType: form.projectType,
          change: form.areaProyecto !== form.area,
        };
        switch (form.area) {
          case ProjectType.concurso:
            activitiesLogic.actions.updateConcurso(dataToUpdate);
            break;
          case ProjectType.feria:
            activitiesLogic.actions.updateFeria(dataToUpdate);
            break;
          case ProjectType.talk:
            activitiesLogic.actions.updateTalk(dataToUpdate);
          default:
            break;
        }
      } catch (e) {
        actions.setIsLoading(false);
      }
    },
  }),
});

export default adminProjectLogic;
