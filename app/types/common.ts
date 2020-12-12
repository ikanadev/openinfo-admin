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

export interface SearchProjectResult {
  id: number;
  nombre: string;
  encargado: User | null;
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

export interface Jury {
  id: number;
  gradoAcademico: string;
  telefono: string;
  usuario: User;
}

export interface Participant {
  usuario: User;
  gradoAcademico: string | null;
  descripcion: string | null;
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
  talk = 'talk',
}

export interface ProjectGrades {
  innovacion: string;
  impacto: string;
  funcionalidad: string;
  ux: string;
  presentacion: string;
}

export interface DateInput {
  year: string;
  month: string;
  day: string;
}
