import { Roles } from 'store/auth/types';
import { USER_TOKEN, IMG_ROUTE } from './const';
import conf from './config';

// This function returns the bearer token in the next order
// of priority: User, Admin, empty
export const getToken = (withBearer = true): string => {
  const token = localStorage.getItem(USER_TOKEN);
  if (token !== null) {
    // return token;
    return `${withBearer ? 'Bearer ' : ''}${token}`;
  }
  return '';
};

export const getRoles = (types: string[]): Roles[] => {
  const roles: Roles[] = [];
  types.forEach((type) => {
    switch (type) {
      case 'ROLE_LEADER_GROUP':
        roles.push(Roles.LeaderGroup);
        break;
      case 'ROLE_LEADER':
        roles.push(Roles.Leader);
        break;
      case 'ROLE_JURY':
        roles.push(Roles.Jury);
        break;
      case 'ROLE_COMMISSION':
        roles.push(Roles.Commission);
        break;
      case 'ROLE_ADMIN':
        roles.push(Roles.Administrator);
        break;
      default:
        break;
    }
  });
  return roles;
};

export const getRoleText = (type: Roles): string => {
  switch (type) {
    case Roles.Leader:
      return 'Líder de Grupo';
    case Roles.LeaderGroup:
      return 'Lider de Actividad';
    case Roles.Commission:
      return 'Comisión';
    case Roles.Jury:
      return 'Jurado';
    case Roles.Administrator:
      return 'Administrador';
    default:
      return '';
  }
};

export const getRolesText = (types: Roles[]): string[] => {
  const rolesText: string[] = [];
  types.forEach((type) => {
    switch (type) {
      case Roles.LeaderGroup:
        rolesText.push('Lider de Actividad');
        break;
      case Roles.Leader:
        rolesText.push('Líder de Grupo');
        break;
      case Roles.Commission:
        rolesText.push('Comisión');
        break;
      case Roles.Jury:
        rolesText.push('Jurado');
        break;
      case Roles.Administrator:
        rolesText.push('Administrador');
        break;
      default:
        break;
    }
  });
  return rolesText;
};

export const getImgURL = (imgName: string): string => `${conf.apiUrl}${IMG_ROUTE}${imgName}`;

// eslint-disable-next-line @typescript-eslint/ban-types
export const getKeyValue = <T extends object, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
