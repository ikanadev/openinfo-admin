import { kea, MakeLogicType } from 'kea';

import api from 'api';
import { ItemType, ProjectGrades } from 'types/common';
import { DEFAULT_OPTION } from 'utils/const';
import authLogic from 'store/auth';
import notificationLogic from 'store/notifications';
import { GradeReq } from 'api/types';
import juriesLogic from 'store/data/juries';

const isValid = (n: number): boolean => n >= 0 && n <= 20;

interface Values {
  isLoading: boolean;
  isOpen: boolean;
  form: {
    grades: ProjectGrades;
    project: ItemType;
  };
}

interface Actions {
  clear: () => void;
  postData: () => void;
  openForm: () => void;
  closeForm: () => void;
  setIsLoading: (value: boolean) => { value: boolean };
  setInnovacion: (value: string) => { value: string };
  setImpacto: (value: string) => { value: string };
  setFuncionalidad: (value: string) => { value: string };
  setUX: (value: string) => { value: string };
  setPresentacion: (value: string) => { value: string };
  setProject: (value: ItemType) => { value: ItemType };
}

const initialState: Values = {
  isLoading: false,
  isOpen: false,
  form: {
    grades: {
      innovacion: '',
      impacto: '',
      funcionalidad: '',
      ux: '',
      presentacion: '',
    },
    project: DEFAULT_OPTION,
  },
};

const gradeLogic = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    clear: true,
    postData: true,
    openForm: true,
    closeForm: true,
    setIsLoading: (value) => ({ value }),
    setInnovacion: (value) => ({ value }),
    setImpacto: (value) => ({ value }),
    setFuncionalidad: (value) => ({ value }),
    setUX: (value) => ({ value }),
    setPresentacion: (value) => ({ value }),
    setProject: (value) => ({ value }),
  },
  defaults: initialState,
  reducers: {
    isLoading: {
      postData: () => true,
      clear: () => false,
      setIsLoading: (_, { value }) => value,
    },
    isOpen: {
      openForm: () => true,
      closeForm: () => false,
    },
    form: {
      setInnovacion: (state, { value }) => ({ ...state, grades: { ...state.grades, innovacion: value } }),
      setImpacto: (state, { value }) => ({ ...state, grades: { ...state.grades, impacto: value } }),
      setFuncionalidad: (state, { value }) => ({ ...state, grades: { ...state.grades, funcionalidad: value } }),
      setUX: (state, { value }) => ({ ...state, grades: { ...state.grades, ux: value } }),
      setPresentacion: (state, { value }) => ({ ...state, grades: { ...state.grades, presentacion: value } }),
      setProject: (state, { value }) => ({ ...state, project: value }),
      clear: () => initialState.form,
    },
  },
  listeners: ({ actions, values }) => ({
    postData: async () => {
      const { form } = values;
      const { data } = authLogic.values;
      const innovacion = parseInt(form.grades.innovacion);
      const impacto = parseInt(form.grades.impacto);
      const funcionalidad = parseInt(form.grades.funcionalidad);
      const ux = parseInt(form.grades.ux);
      const presentacion = parseInt(form.grades.presentacion);
      if (form.project.id === 0) {
        notificationLogic.actions.addWarning('Datos incorrectos', 'Debe seleccionar un proyecto');
        actions.setIsLoading(false);
        return;
      }
      if (isNaN(innovacion) || isNaN(impacto) || isNaN(funcionalidad) || isNaN(ux) || isNaN(presentacion)) {
        notificationLogic.actions.addWarning('Datos incorrectos', 'Solo se aceptan valores numéricos');
        actions.setIsLoading(false);
        return;
      }
      if (
        !isValid(innovacion) ||
        !isValid(impacto) ||
        !isValid(funcionalidad) ||
        !isValid(ux) ||
        !isValid(presentacion)
      ) {
        notificationLogic.actions.addWarning('Datos incorrectos', 'Las calificaciones deben estar entre 0 y 20');
        actions.setIsLoading(false);
        return;
      }
      try {
        const dataGrade: GradeReq = {
          codRegistro: data.username,
          idProyecto: form.project.id,
          innovacion,
          impacto,
          funcionalidad,
          ux,
          presentacion,
        };
        const resp = await api.commission.postGrade(dataGrade);
        notificationLogic.actions.addSuccess('Hecho!', resp.mensaje);
        juriesLogic.actions.setGrades(dataGrade);
        actions.clear();
        actions.closeForm();
      } catch (e) {
        actions.setIsLoading(false);
      }
    },
  }),
});

export default gradeLogic;
