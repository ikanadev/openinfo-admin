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
  // scope: string[];
  active: boolean;
  // exp: number;
  authorities: [string];
  // jti: string;
  // client_id: string;
}
