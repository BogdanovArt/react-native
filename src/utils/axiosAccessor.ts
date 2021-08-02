import axios from "axios";

import { API } from "../utils/api";
import { store } from "../store";

import { RequestMethods } from "../types/enums";
import { forceLogout, saveTokens } from "../store/auth/actions";

axios.interceptors.request.use((config) => {
  const state = store.getState();
  const tokens = state.auth.authTokens;

  if (config.headers.common) {
    if (tokens && tokens.token) {
      config.headers.common.Authorization = `Bearer ${tokens.token}`;
    } else {
      delete config.headers.common.Authorization;
    }
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const state = store.getState();
    const tokens = state.auth.authTokens;

    const code = parseInt(error.response && error.response.status);
    const originRequest = error.config;

    if (!originRequest) return Promise.reject(error);

    const isRefreshRes = originRequest.url === API.AUTH.REFRESH;

    if (isRefreshRes && code > 399) {
      store.dispatch(forceLogout());
      return Promise.reject(new Error("Error refreshing tokens"));
    }

    if (code !== 401 || !tokens || !tokens.refresh) {
      return Promise.reject(error);
    }

    const refreshRequest = {
      url: API.AUTH.REFRESH,
      method: RequestMethods.POST,
      data: tokens,
    };

    return axios(refreshRequest)
      .then((response) => {
        const newToken = response.data.data.token;
        const newRefresh = response.data.data.refresh;
        if (newToken && newRefresh) {
          store.dispatch(
            saveTokens({
              token: newToken,
              refresh: newRefresh,
            })
          );
          originRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return axios(originRequest);
      })
      .catch((error) => {
        console.error("ощибка обновления токена", error);
      });
  }
);

export { axios };
