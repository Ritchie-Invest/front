import Constants from 'expo-constants';

export const config = {
  API_URL: Constants.expoConfig?.extra?.API_URL || 'http://localhost:3000',

  SSO_LOGIN_ENABLED: Constants.expoConfig?.extra?.SSO_LOGIN_ENABLED || false,

  FORGOT_PASSWORD_ENABLED: Constants.expoConfig?.extra?.FORGOT_PASSWORD_ENABLED || false,

  SIGNUP_ENABLED: Constants.expoConfig?.extra?.SIGNUP_ENABLED || false,

  LOCK_DASHBOARD: Constants.expoConfig?.extra?.LOCK_DASHBOARD || false,

  SHOW_BADGE_OVERLAY: Constants.expoConfig?.extra?.SHOW_BADGE_OVERLAY || true,

  MAX_LIVES: Number(Constants.expoConfig?.extra?.MAX_LIVES) || 2,

  LIFE_REGENERATION_TIME_MS:
    Number(Constants.expoConfig?.extra?.LIFE_REGENERATION_TIME_MS) || 10000,
} as const;
