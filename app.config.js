import 'dotenv/config'

export default {
  expo: {
    name: "ritchie-invest",
    slug: "ritchie-invest",
    version: "1.0.0",
    orientation: "portrait",
    icon: "src/assets/icons/icon.png",
    userInterfaceStyle: "light",
    assetBundlePatterns: ["**/*"],
    newArchEnabled: true,
    splash: {
      image: "./src/assets/icons/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.d.farau.ritchieinvest",
      buildNumber: "1.0.0",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "src/assets/icons/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.d.farau.ritchieinvest",
      versionCode: 2,
    },
    web: {
      favicon: "./src/assets/icons/favicon.png",
      bundler: "metro",
    },
    experiments: {
      webBundler: "metro",
    },
    plugins: ["expo-localization"],
    extra: {
      API_URL: process.env.API_URL,
      SSO_LOGIN_ENABLED: process.env.SSO_LOGIN_ENABLED,
      FORGOT_PASSWORD_ENABLED: process.env.FORGOT_PASSWORD_ENABLED,
      SIGNUP_ENABLED: process.env.SIGNUP_ENABLED,
      LOCK_DASHBOARD: process.env.LOCK_DASHBOARD,
      MAX_LIVES: process.env.MAX_LIVES,
      LIFE_REGENERATION_TIME_MS: process.env.LIFE_REGENERATION_TIME_MS,
      eas: {
        projectId: "5c2df484-8c85-4390-8911-15c37c322260",
      },
    },
    owner: "ritchie-invest",
  },
}
