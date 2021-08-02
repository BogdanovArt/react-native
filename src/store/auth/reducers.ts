import { PayloadAction } from "@reduxjs/toolkit";
import { AuthState, Tokens, UserData } from "./types";

const reducers = {
  setAuthTokens: (state: AuthState, action: PayloadAction<Tokens | null>) => {
    state.authTokens = action.payload;
  },
  setUserData: (state: AuthState, action: PayloadAction<UserData | null>) => {
    state.userData = action.payload;
  },
  setAuthState: (state: AuthState, action: PayloadAction<boolean>) => {
    state.authSuccess = action.payload;
  },
  setError: (state: AuthState, action: PayloadAction<string>) => {
    state.error = action.payload;
  },
};

export default reducers;
