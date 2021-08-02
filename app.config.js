const env = require("dotenv").config().parsed;

export default ({ config }) => {

  if (!process.env.EXPO_DEVTOOLS_LISTEN_ADDRESS) {
    process.env.EXPO_DEVTOOLS_LISTEN_ADDRESS = env.APP_HOST || '0.0.0.0';
  }

  config.owner = env.EXPO_OWNER;

  config.extra = {
    appHost: env.APP_HOST,
  };
  return { ...config };
};
