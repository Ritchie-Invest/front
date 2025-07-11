import Constants from 'expo-constants';

export const config = {
  // API Configuration
  API_URL: Constants.expoConfig?.extra?.API_URL || 'http://localhost:3000',

  // SSO Configuration
  SSO_LOGIN_ENABLED: Constants.expoConfig?.extra?.SSO_LOGIN_ENABLED || false,

  // Forgot Password Configuration
  FORGOT_PASSWORD_ENABLED: Constants.expoConfig?.extra?.FORGOT_PASSWORD_ENABLED || false,

  // Signup Configuration
  SIGNUP_ENABLED: Constants.expoConfig?.extra?.SIGNUP_ENABLED || false,
} as const;
