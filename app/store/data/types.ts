import { Team } from 'types/common';

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
