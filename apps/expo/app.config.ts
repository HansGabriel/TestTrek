import { ExpoConfig, ConfigContext } from "@expo/config";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_Z3Jvd2luZy1kb2Jlcm1hbi04OC5jbGVyay5hY2NvdW50cy5kZXYk";
const SERVER_URL = "https://test-trek-prod.vercel.app";
const SERVER_ENV: "development" | "production" = "production";

const defineConfig = (_ctx: ConfigContext): ExpoConfig => ({
  name: "TestTrek",
  slug: "testtrek",
  scheme: "testtrek",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.mathbasher.testtrek",
    backgroundColor: "#ffffff",
    buildNumber: "1",
  },
  android: {
    package: "com.mathbasher.testtrek",
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: "./assets/testtrek-adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    permissions: ["READ_EXTERNAL_STORAGE", "WRITE_EXTERNAL_STORAGE"],
  },
  extra: {
    eas: {
      projectId: "07bbeb73-37eb-4c3e-8e52-f1a1ffb4665b",
    },
    CLERK_PUBLISHABLE_KEY,
    SERVER_URL,
    SERVER_ENV,
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
