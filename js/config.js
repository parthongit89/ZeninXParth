// ZeninXParth Firebase & App Configuration
let dynamicConfig = {
  apiKey: "your_api_key_here",
  authDomain: "your_project_id.firebaseapp.com",
  projectId: "your_project_id",
  storageBucket: "your_project_id.firebasestorage.app",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id",
  measurementId: "your_measurement_id"
};

try {
  const localEnv = await import("./env.js");
  if (localEnv && localEnv.firebaseConfig) {
    dynamicConfig = localEnv.firebaseConfig;
  }
} catch (e) {
  // env.js is not present in repo / production builds
}

export const firebaseConfig = dynamicConfig;

export const appMetadata = {
  name: "ZeninXParth",
  tagline: "High-Performance Indie Cyber-Arcade & Game Development Lab",
  version: "1.0.0",
  releaseDate: "14 Sept 2026",
  team: {
    name: "ZeninXParth Teams",
    members: [
      {
        handle: "Ghostofzenin08",
        name: "Harshal Sonawane",
        github: "https://github.com/Ghostofzenin08",
        roles: ["Game Developer", "Game Graphics", "Game Logistic", "Game Analytics"]
      },
      {
        handle: "Parthongit89",
        name: "Parth Sonavane",
        github: "https://github.com/parthongit89",
        roles: ["Frontend Developer", "Backend Developer", "Deployment"]
      }
    ]
  }
};
