// app.config.js
export default ({ config }) => {
  return {
    ...config,
    name: "ReciclAÊ",
    slug: "ReciclAe",
    version: "1.0.2",
    orientation: "portrait",
    icon: "./assets/ReciclAE-logo.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/ChatGPT.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.ReciclAe"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.anonymous.ReciclAe",
      versionCode: 3
    },
    plugins: [
      "expo-font",
      [
        "expo-navigation-bar",
        {
          "visible": "immersive"  // aqui estava o androidNavigationBar.visible
        }
      ],
      "expo-system-ui"
    ],
    extra: {
      eas: {
        projectId: "063206b3-8edf-45cf-b113-50c6cbf4323d"
      }
    }
  };
};