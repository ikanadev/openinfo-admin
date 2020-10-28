import { FC } from 'react';

import { Roles } from 'store/auth/types';

// Icons
export interface IconProps {
  size?: number;
  color?: string;
}

export interface MenuItemData {
  id: number;
  icon: FC<IconProps>;
  title: string;
  component: FC<unknown>;
  subpath: string;
  path: string;
  availableTo: Roles;
}

export interface SearchResult {
  codRegistro: string;
  nombre: string;
  correo: string;
}

// ItemType is an interface which represents an intem for select forms
export interface ItemType {
  id: number;
  nombre: string;
}

export interface User {
  codRegistro: string;
  nombre: string;
  sexo: null | string;
  correo: string;
  habilitado: boolean;
}

export interface Team {
  idEquipo: number;
  nombre: string;
  encargado: User;
}
export interface TeamWithType extends Team {
  tipoEquipo: ItemType;
}

export interface LeaderTeam extends Team {
  tipoEquipo: ItemType;
}

export enum ProjectType {
  feria = 'feria',
  concurso = 'concurso',
}

export interface Project {
  id: number;
  nombre: string;
  problematica: string | null;
  objetivoGeneral: string | null;
  alcance: string | null;
  beneficiarios: string | null;
  valorAgregado: string | null;
  descripcion: string | null;
  banner: string | null;
  linkVideo: string | null;
  area: ProjectType;
  habilitado: boolean;
  equipo: TeamWithType;
  // TODO: check if this field is number or string
  tipoProyecto: number | null;
}
