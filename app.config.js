import 'dotenv/config'

export default {
  expo: {
    name: "ritchie-invest",
    slug: "ritchie-invest",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icons/icon.png",
    userInterfaceStyle: "light",
    assetBundlePatterns: ["**/*"],
    newArchEnabled: true,
    splash: {
      image: "./assets/icons/splash-icon.png",
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
        foregroundImage: "./assets/icons/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.d.farau.ritchieinvest",
      versionCode: 2,
    },
    web: {
      favicon: "./assets/icons/favicon.png",
      bundler: "metro",
    },
    experiments: {
      webBundler: "metro",
    },
    extra: {
      API_URL: process.env.API_URL,
      SSO_LOGIN_ENABLED: process.env.SSO_LOGIN_ENABLED,
      FORGOT_PASSWORD_ENABLED: process.env.FORGOT_PASSWORD_ENABLED,
      eas: {
        projectId: "5c2df484-8c85-4390-8911-15c37c322260",
      },
    },
    owner: "ritchie-invest",
  },
}
