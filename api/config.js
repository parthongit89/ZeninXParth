export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  
  res.status(200).json({
    apiKey: process.env.FIREBASE_API_KEY || "",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "ghostofzenin.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "ghostofzenin",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "ghostofzenin.firebasestorage.app",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "241503300378",
    appId: process.env.FIREBASE_APP_ID || "1:241503300378:web:07764552638aa1073f1aa3",
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-1XXDEPXNQP"
  });
}
