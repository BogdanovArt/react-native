export interface AuthState {
  authSuccess: boolean;
  authTokens: Tokens | null;
  userData: UserData | null;
  error: string;
}

export interface Tokens {
  token: string;
  refresh: string;
}

export interface UserData {
  user_code: string;
  fio: string;
}

export enum TokenKeys {
  token = "@auth_token",
  refresh = "@auth_refresh",
  fio = "@user_fio",
  code = "@uder_code",
}
