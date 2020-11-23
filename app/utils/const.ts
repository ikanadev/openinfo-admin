import { ItemType } from 'types/common';

export const USER_TOKEN = 'USER_TOKEN';
export const EmpyFile: File = new File([], '');
export const DEFAULT_OPTION = { id: 0, nombre: 'Seleccione una opción' };
export const IMG_ROUTE = '/openInfo/img/';
export const GRADOS: ItemType[] = [
  { id: 1, nombre: 'Estudiante' },
  { id: 2, nombre: 'Lic.' },
  { id: 3, nombre: 'Ms. C.' },
  { id: 4, nombre: 'Dr.' },
  { id: 5, nombre: 'Ph. D.' },
];
