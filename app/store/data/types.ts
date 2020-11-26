import { Team, ProjectType, TeamWithType, Participant, ItemType, Jury, User } from 'types/common';

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

export interface Talk {
  id: number;
  nombre: string;
  descripcion: string | null;
  banner: string | null;
  video: string | null;
  linkOficial: string | null;
  expositor: User;
  gradoAcademico: string | null;
  institucion: string | null;
  telefono: string | null;
  foto: string | null;
  habilitado: boolean;
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
  linkOficial: null | string;
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
