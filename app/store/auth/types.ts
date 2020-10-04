export enum Roles {
  Administrator,
  Commission,
  Leader,
  Jury,
}

export interface AuthData {
  isLogged: boolean;
  isActive: boolean;
  role: Roles;
  username: string;
}
