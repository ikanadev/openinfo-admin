import { AxiosRequestConfig } from 'axios';

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
  auspiciador: {
    id: number;
    nombre: string;
    logo: string;
    descripcion: string;
    link: string;
    contacto: string;
    gestion: null | number;
    createAt: string;
  };
  mensaje: string;
}
