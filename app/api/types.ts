import { AxiosRequestConfig } from 'axios';

import { Sponsor, TeamStore, LeaderProject } from 'store/data/types';
import { SearchResult, ItemType, User, LeaderTeam, Participant, ProjectType } from 'types/common';
export const FORM_URLENCODED = 'application/x-www-form-urlencoded';

export type UploadPercent = (percent: number) => void;

export const axiosFormConfig = (cb: UploadPercent): AxiosRequestConfig => ({
  headers: {
    'Content-Type': FORM_URLENCODED,
  },
  onUploadProgress: (progress) => {
    const uploadPercent = Math.round((progress.loaded * 100) / progress.total);
    cb(uploadPercent);
  },
});
// the commented fields in responses are values we'll probably never use
export interface LoginReq {
  username: string;
  password: string;
  grant_type: string;
}
export interface LoginResp {
  access_token: string;
  // token_type: string;
  // refresh_token: string;
  // expires_in: number;
  // scope: string;
  // jti: string;
}

export interface CheckTokenReq {
  token: string;
}
export interface CheckTokenResp {
  user_name: string;
  nombre: string;
  // scope: string[];
  active: boolean;
  // exp: number;
  authorities: string[];
  // jti: string;
  // client_id: string;
}

export interface PostSponsorReq {
  nombre: string;
  logo: File;
  descripcion: string;
  contacto: string;
  linkPagina: string;
}
export interface PostSponsorRes {
  auspiciador: Sponsor;
  mensaje: string;
}

export interface GetSponsorsRes {
  auspiciadores: Sponsor[];
}

export interface SearchUserRes {
  usuarios: SearchResult[];
}

export interface ProjectTypesRes {
  tipoProyectos: ItemType[];
}

export interface TeamTypesRes {
  tipoEquipos: ItemType[];
}

export interface NewTeamReq {
  idTipoEquipo: number;
  nombre: string;
  codRegistro: string;
}
export interface NewTeamRes {
  equipo: {
    idEquipo: 3;
    nombre: string;
    tipoEquipo: ItemType;
    encargado: User;
    habilitado: boolean;
    createAt: string;
  };
}

export interface TeamsRes {
  tipoEquipos: TeamStore[];
}

export interface LeaderTeamsRes {
  equipos: LeaderTeam[];
}

export interface NewProjectReq {
  nombre: string;
  area: string;
  idEquipo: number;
  codJefeProyecto: string;
}
export interface NewProjectRes {
  proyecto: LeaderProject;
}

export interface LeaderProjectsRes {
  Proyectos: LeaderProject[];
}

export interface UserProjectsRes {
  proyectos: LeaderProject[];
}

export interface NewMemberReq {
  ci: string;
  foto: File;
  gradoAcademico: string;
  telefono: string;
  contacto2: string;
  contacto3: string;
  descripcion: string;
  codRegistro: string;
  idProyecto: number;
}
export interface NewMemberRes {
  participante: Participant;
  proyecto: {
    id: number;
  };
}

export interface UpdateProjectReq {
  nombre: string;
  problematica: string;
  objetivoGeneral: string;
  alcance: string;
  beneficiarios: string;
  valorAgregado: string;
  descripcion: string;
  linkVideo: string;
  idTipoProyecto: string;
  objetivos: string;
  area: ProjectType;
  banner: File;
}
export interface UpdateProjectRes {
  proyecto: {
    id: number;
    nombre: string;
    problematica: string;
    objetivoGeneral: string;
    objetivosEspecificos: string;
    alcance: string;
    beneficiarios: string;
    valorAgregado: string;
    descripcion: string;
    banner: string;
    linkVideo: string;
    area: ProjectType;
    tipoProyecto: ItemType;
  };
}
