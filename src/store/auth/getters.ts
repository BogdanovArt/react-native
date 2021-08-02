import { RootState } from "../index";

export const getAuthTokens = (state: RootState) => state.auth.authTokens;
export const getError = (state: RootState) => state.auth.error;
export const getAuthState = (state: RootState) => state.auth.authSuccess;
export const getUserData = (state: RootState) => state.auth.userData;