export enum Roles {
  Administrator,
  Commission,
  LeaderGroup,
  Leader,
  Jury,
}

export interface AuthData {
  isLogged: boolean;
  isActive: boolean;
  roles: Roles[];
  username: string;
  name: string;
}
