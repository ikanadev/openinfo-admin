import { Team, ProjectType, TeamWithType, Participant } from 'types/common';

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
  objectivosEspecificos: string[];
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
  // TODO: this will be an ID or an object
  tipoProyecto: null | unknown;
  equipo: TeamWithType;
  gestion: null | number;
  createAt: string;
  participantes: Participant[];
}
