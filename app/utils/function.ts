import { Roles } from 'store/auth/types';
import { USER_TOKEN } from './const';

// This function returns the bearer token in the next order
// of priority: User, Admin, empty
export const getToken = (): string => {
  const token = localStorage.getItem(USER_TOKEN);
  if (token !== null) {
    return token;
    return `Bearer ${token}`;
  }
  return '';
};

export const getRole = (type: string): Roles => {
  switch (type) {
    case 'ROLE_LEADER':
      return Roles.Leader;
    case 'ROLE_JURY':
      return Roles.Jury;
    case 'ROLE_COMMISSION':
      return Roles.Commission;
    case 'ROLE_ADMIN':
      return Roles.Administrator;
    default:
      return Roles.Leader;
  }
};

export const getRoleText = (type: Roles): string => {
  switch (type) {
    case Roles.Leader:
      return 'Líder de Grupo';
    case Roles.Commission:
      return 'Comisión';
    case Roles.Jury:
      return 'Jurado';
    case Roles.Administrator:
      return 'Administrador';
    default:
      return 'Líder de Grupo';
  }
};
