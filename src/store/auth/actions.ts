import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthTokens, setError, setUserData } from "./index";
import { AppThunk } from "../";

import { RequestMethods } from "../../types/enums";
import { IBasicObject } from "../../types/index";
import { TokenKeys, Tokens, UserData } from "./types";

import { defaultError } from "../../utils/consts";
import { axios } from "../../utils/axiosAccessor";
import { API } from "../../utils/api";

interface RequestPayload {
  payload?: IBasicObject | {};
  method?: RequestMethods;
}

export const authorize =
  ({ payload = {}, method = RequestMethods.POST }: RequestPayload): AppThunk =>
  async (dispatch) => {
    try {
      const res = await axios({
        url: API.AUTH.LOGIN,
        method,
        data: payload,
      });

      const { auth, data, errors } = res.data;

      if (data && auth && !errors) {
        dispatch(saveUserData(data));
        dispatch(saveTokens(auth));
      }

      if (errors) {
        const keys = Object.keys(errors);
        let error;
        if (keys.length) {
          error = errors[keys[0]];
        }
        dispatch(setError(error || defaultError));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error.response?.data?.error || defaultError));
    }
  };

export const getAuthData =
  (): AppThunk =>
  async (dispatch) => {
    try {
      const res = await axios({
        url: API.LAYOUT,
        method: RequestMethods.GET,
      });

      const { account } = res.data;
      if (account) {
        const { auth, data } = account;
        dispatch(saveUserData(data));
        dispatch(saveTokens(auth));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error.response?.data?.error || defaultError));
    }
  };

export const restoreTokens = (): AppThunk => async (dispatch) => {
  try {
    const tokenReq = AsyncStorage.getItem(TokenKeys.token);
    const refreshReq = AsyncStorage.getItem(TokenKeys.refresh);
    const [token, refresh] = await Promise.all([tokenReq, refreshReq]);
    if (token && refresh) {
      await dispatch(setAuthTokens({ token, refresh }));
    }
  } catch (err) {
    console.error(err);
  }
};

export const restoreUserData = (): AppThunk => async (dispatch) => {
  try {
    const fioReq = AsyncStorage.getItem(TokenKeys.fio);
    const codeReq = AsyncStorage.getItem(TokenKeys.code);
    const [fio, user_code] = await Promise.all([fioReq, codeReq]);
    if (fio && user_code) {
      await dispatch(setUserData({ fio, user_code }));
    }
  } catch (err) {
    console.error(err);
  }
};

export const saveUserData =
  ({ fio, user_code }: UserData): AppThunk =>
  async (dispatch) => {
    try {
      const fioReq = AsyncStorage.setItem(TokenKeys.fio, fio);
      const codehReq = AsyncStorage.setItem(TokenKeys.code, user_code);
      await Promise.all([
        fioReq,
        codehReq,
        dispatch(setUserData({ fio, user_code })),
      ]);
    } catch (err) {
      console.error(err);
    }
  };

export const saveTokens =
  ({ token, refresh }: Tokens): AppThunk =>
  async (dispatch) => {
    try {
      const tokenReq = AsyncStorage.setItem(TokenKeys.token, token);
      const refreshReq = AsyncStorage.setItem(TokenKeys.refresh, refresh);
      await Promise.all([tokenReq, refreshReq]);
      await dispatch(setAuthTokens({ token, refresh }));
    } catch (err) {
      console.error(err);
    }
  };

export const forceLogout = (): AppThunk => async (dispatch) => {
  const tokenReq = AsyncStorage.removeItem(TokenKeys.token);
  const refreshReq = AsyncStorage.removeItem(TokenKeys.refresh);

  const fioReq = AsyncStorage.removeItem(TokenKeys.fio);
  const codeReq = AsyncStorage.removeItem(TokenKeys.code);
  await Promise.all([
    tokenReq,
    refreshReq,
    fioReq,
    codeReq,
    dispatch(setAuthTokens(null)),
    dispatch(setUserData(null)),
  ]);
};
