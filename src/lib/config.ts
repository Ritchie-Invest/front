import Constants from 'expo-constants';

export const config = {
  API_URL: Constants.expoConfig?.extra?.API_URL || 'http://localhost:3000',

  SSO_LOGIN_ENABLED: Constants.expoConfig?.extra?.SSO_LOGIN_ENABLED || false,

  FORGOT_PASSWORD_ENABLED: Constants.expoConfig?.extra?.FORGOT_PASSWORD_ENABLED || false,

  SIGNUP_ENABLED: Constants.expoConfig?.extra?.SIGNUP_ENABLED || false,

  LOCK_DASHBOARD: Constants.expoConfig?.extra?.LOCK_DASHBOARD || false,
} as const;
