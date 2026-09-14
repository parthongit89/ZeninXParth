// ZeninXParth Firebase & App Configuration
let dynamicConfig = {
  apiKey: "your_api_key_here",
  authDomain: "ghostofzenin.firebaseapp.com",
  projectId: "ghostofzenin",
  storageBucket: "ghostofzenin.firebasestorage.app",
  messagingSenderId: "241503300378",
  appId: "1:241503300378:web:07764552638aa1073f1aa3",
  measurementId: "G-1XXDEPXNQP"
};

// 1. Try loading from local git-ignored env.js (for local development)
try {
  const localEnv = await import("./env.js");
  if (localEnv && localEnv.firebaseConfig) {
    dynamicConfig = { ...dynamicConfig, ...localEnv.firebaseConfig };
  }
} catch (e) {
  // env.js is not present in repo / production builds
}

// 2. If running on Vercel, fetch from serverless endpoint /api/config
if (!dynamicConfig.apiKey || dynamicConfig.apiKey === "your_api_key_here") {
  try {
    const res = await fetch("/api/config");
    if (res.ok) {
      const serverConfig = await res.json();
      if (serverConfig && serverConfig.apiKey) {
        dynamicConfig = { ...dynamicConfig, ...serverConfig };
      }
    }
  } catch (e) {
    // local offline or non-vercel host
  }
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
