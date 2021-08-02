import { createSlice } from "@reduxjs/toolkit";

import { AuthState } from "./types";

import reducers from "./reducers";

const initialState: AuthState = {
  userData: null,
  authSuccess: false,
  authTokens: null,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers,
});

export const { setAuthTokens, setError, setAuthState, setUserData } =
  authSlice.actions;

export default authSlice.reducer;
