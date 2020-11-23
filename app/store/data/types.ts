import { Team, ProjectType, TeamWithType, Participant, ItemType, Jury } from 'types/common';

export interface Sponsor {
  id: number;
  nombre: string;
  logo: string;
  descripcion: string;
  link: string;
  contacto: string;
}

export interface TeamStore {
  id: number;
  nombre: string;
  equipos: Team[];
}

export interface LeaderProject {
  id: number;
  nombre: string;
  problematica: null | string;
  objetivoGeneral: null | string;
  objetivosEspecificos: string[];
  alcance: null | string;
  beneficiarios: null | string;
  valorAgregado: null | string;
  descripcion: null | string;
  banner: null | string;
  linkVideo: null | string;
  area: ProjectType;
  vistas: null | number;
  codigo: string;
  habilitado: boolean;
  tipoProyecto: null | ItemType;
  equipo: TeamWithType;
  gestion: null | number;
  createAt: string;
  participantes: Participant[];
}

export interface JuryStore extends Jury {
  proyectos: {
    id: number;
    proyecto: LeaderProject;
    innovacion: null | number;
    impacto: null | number;
    funcionalidad: null | number;
    ux: null | number;
    presentacion: null | number;
  }[];
}
