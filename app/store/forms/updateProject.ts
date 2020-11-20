import api from 'api';
import { kea, MakeLogicType } from 'kea';

import { LeaderProject } from 'store/data/types';
import userProjectsLogic from 'store/data/userProjects';
import notificationLogic from 'store/notifications';
import { ItemType, ProjectType } from 'types/common';
import { DEFAULT_OPTION, EmpyFile } from 'utils/const';

interface Values {
  form: LeaderProject;
  isLoading: boolean;
  percentUploaded: number;
  imageFile: File;
  showForm: boolean;
}
interface Actions {
  setData: (data: LeaderProject) => { data: LeaderProject };
  setNombre: (value: string) => { value: string };
  setProblematica: (value: string) => { value: string };
  setObjetivoGeneral: (value: string) => { value: string };
  setAlcance: (value: string) => { value: string };
  setBeneficiarios: (value: string) => { value: string };
  setValorAgregado: (value: string) => { value: string };
  setDescripcion: (value: string) => { value: string };
  setBanner: (value: string) => { value: string };
  setLinkVideo: (value: string) => { value: string };
  setArea: (value: ProjectType) => { value: ProjectType };
  setTipoProyecto: (value: ItemType) => { value: ItemType };
  setObjectives: (value: string[]) => { value: string[] };
  setFile: (file: File) => { file: File };
  setIsLoading: (value: boolean) => { value: boolean };
  setPercent: (value: number) => { value: number };
  postData: () => void;
  clear: () => void;
  setShowForm: (value: boolean) => { value: boolean };
}
const initialState: Values = {
  isLoading: false,
  percentUploaded: 0,
  imageFile: EmpyFile,
  showForm: false,
  form: {
    id: 0,
    nombre: '',
    problematica: null,
    objetivoGeneral: null,
    objetivosEspecificos: [],
    alcance: null,
    beneficiarios: null,
    valorAgregado: null,
    descripcion: null,
    banner: null,
    linkVideo: null,
    area: ProjectType.concurso,
    vistas: null,
    codigo: '',
    habilitado: true,
    tipoProyecto: null,
    gestion: null,
    createAt: '',
    participantes: [],
    equipo: {
      idEquipo: 0,
      nombre: '',
      tipoEquipo: DEFAULT_OPTION,
      encargado: {
        codRegistro: '',
        correo: '',
        habilitado: true,
        nombre: '',
        sexo: null,
      },
    },
  },
};

const isValidForm = (
  form: LeaderProject,
): form is LeaderProject & {
  descripcion: string;
  nombre: string;
  problematica: string;
  objetivoGeneral: string;
  alcance: string;
  beneficiarios: string;
  valorAgregado: string;
  linkVideo: string;
  tipoProyecto: ItemType;
} => {
  if (
    !form.descripcion ||
    !form.nombre ||
    !form.problematica ||
    !form.objetivoGeneral ||
    !form.alcance ||
    !form.beneficiarios ||
    !form.valorAgregado ||
    !form.descripcion ||
    !form.valorAgregado ||
    !form.linkVideo ||
    !form.tipoProyecto ||
    form.tipoProyecto.id === 0 ||
    form.objetivosEspecificos.length === 0
  ) {
    return false;
  }
  return true;
};

const updateProjectLogic = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    setData: (data) => ({ data }),
    setNombre: (value) => ({ value }),
    setProblematica: (value) => ({ value }),
    setObjetivoGeneral: (value) => ({ value }),
    setAlcance: (value) => ({ value }),
    setBeneficiarios: (value) => ({ value }),
    setValorAgregado: (value) => ({ value }),
    setDescripcion: (value) => ({ value }),
    setBanner: (value) => ({ value }),
    setLinkVideo: (value) => ({ value }),
    setArea: (value) => ({ value }),
    setFile: (file) => ({ file }),
    setTipoProyecto: (value) => ({ value }),
    setObjectives: (value) => ({ value }),
    setIsLoading: (value) => ({ value }),
    setPercent: (value) => ({ value }),
    postData: () => true,
    clear: () => true,
    setShowForm: (value) => ({ value }),
  },
  defaults: initialState,
  reducers: {
    isLoading: {
      postData: () => true,
      clear: () => false,
      setIsLoading: (_, { value }) => value,
    },
    percentUploaded: {
      setData: () => 0,
      setPercent: (_, { value }) => value,
      clear: () => 0,
    },
    form: {
      setData: (_, { data }) => data,
      setNombre: (state, { value }) => ({ ...state, nombre: value }),
      setProblematica: (state, { value }) => ({ ...state, problematica: value }),
      setObjetivoGeneral: (state, { value }) => ({ ...state, objetivoGeneral: value }),
      setAlcance: (state, { value }) => ({ ...state, alcance: value }),
      setBeneficiarios: (state, { value }) => ({ ...state, beneficiarios: value }),
      setValorAgregado: (state, { value }) => ({ ...state, valorAgregado: value }),
      setDescripcion: (state, { value }) => ({ ...state, descripcion: value }),
      setBanner: (state, { value }) => ({ ...state, banner: value }),
      setLinkVideo: (state, { value }) => ({ ...state, linkVideo: value }),
      setArea: (state, { value }) => ({ ...state, area: value }),
      setTipoProyecto: (state, { value }) => ({ ...state, tipoProyecto: value }),
      setObjectives: (state, { value }) => ({ ...state, objetivosEspecificos: value }),
      clear: () => initialState.form,
    },
    showForm: {
      setShowForm: (_, { value }) => value,
      clear: () => initialState.showForm,
    },
    imageFile: {
      clear: () => initialState.imageFile,
      setFile: (_, { file }) => file,
    },
  },
  listeners: ({ actions, values }) => ({
    postData: async () => {
      const { form, imageFile } = values;
      if (!isValidForm(form) || imageFile.size === 0) {
        notificationLogic.actions.addWarning('Campos requeridos', 'Todos los campos son requeridos');
        actions.setIsLoading(false);
        return;
      }
      try {
        const resp = await api.projectLeader.updateProject(
          form.id,
          {
            alcance: form.alcance,
            area: form.area,
            banner: imageFile,
            beneficiarios: form.beneficiarios,
            descripcion: form.descripcion,
            idTipoProyecto: form.tipoProyecto.id.toString(),
            linkVideo: form.linkVideo,
            nombre: form.nombre,
            objetivoGeneral: form.objetivoGeneral,
            objetivos: form.objetivosEspecificos.join('_'),
            problematica: form.problematica,
            valorAgregado: form.valorAgregado,
          },
          (percent) => {
            actions.setPercent(percent);
          },
        );
        notificationLogic.actions.addSuccess('Hecho!', `Proyecto ${form.nombre} actualizado`);
        actions.clear();
        userProjectsLogic.actions.updateProject(resp);
        actions.setShowForm(false);
      } catch (e) {
        actions.setIsLoading(false);
        actions.setPercent(0);
      }
    },
  }),
});

export default updateProjectLogic;
