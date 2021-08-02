import config from "expo-constants";
const protocol = 'http'
const origin = config.manifest.extra?.appHost || "";

export const API = {
  AUTH: {
    LOGIN: `${protocol}://${origin}/api/v1/auth/login/`,
    REFRESH: `${protocol}://${origin}/api/v1/auth/refresh/`,
  },
  RECEIPT: {
    INDEX: `${protocol}://${origin}/api/v1/check/`,
    ADD: `${protocol}://${origin}/api/v1/check/add/`,
    CREATE: `${protocol}://${origin}/api/v1/check/create/`,
  },
  LAYOUT: `${protocol}://${origin}/api/v1/layout/`,
  RATING: `${protocol}://${origin}/api/v1/rating/`,

};
