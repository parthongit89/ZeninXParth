// Firebase Web Authentication with Google Provider
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { firebaseConfig } from "./config.js";

let app;
let auth;
let provider;
let currentUser = null;
const authSubscribers = [];

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = {
        uid: user.uid,
        displayName: user.displayName || "Pilot",
        email: user.email,
        photoURL: user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.uid}`,
        isAnonymous: false
      };
      localStorage.setItem("zenin_auth_user", JSON.stringify(currentUser));
    } else {
      currentUser = null;
      localStorage.removeItem("zenin_auth_user");
    }
    notifySubscribers(currentUser);
  });
} catch (err) {
  console.warn("Firebase initialization warning (running in offline/local fallback mode):", err);
  const cached = localStorage.getItem("zenin_auth_user");
  if (cached) {
    try {
      currentUser = JSON.parse(cached);
    } catch (e) {
      currentUser = null;
    }
  }
}

function notifySubscribers(user) {
  authSubscribers.forEach((cb) => {
    try {
      cb(user);
    } catch (e) {
      console.error("Auth subscriber error:", e);
    }
  });
}

export function onUserChange(callback) {
  authSubscribers.push(callback);
  callback(currentUser);
  return () => {
    const idx = authSubscribers.indexOf(callback);
    if (idx !== -1) authSubscribers.splice(idx, 1);
  };
}

export async function loginWithGoogle() {
  if (!auth || !provider) {
    // Fallback simulated login if Firebase CDN blocked or offline
    currentUser = {
      uid: "pilot-zenin-local",
      displayName: "Guest Pilot",
      email: "pilot@zeninxparth.internal",
      photoURL: "https://api.dicebear.com/7.x/bottts/svg?seed=Ghostofzenin",
      isAnonymous: true
    };
    localStorage.setItem("zenin_auth_user", JSON.stringify(currentUser));
    notifySubscribers(currentUser);
    return currentUser;
  }

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    currentUser = {
      uid: user.uid,
      displayName: user.displayName || "Pilot",
      email: user.email,
      photoURL: user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.uid}`,
      isAnonymous: false
    };
    localStorage.setItem("zenin_auth_user", JSON.stringify(currentUser));
    notifySubscribers(currentUser);
    return currentUser;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    // If popup was blocked or origin not allowed, offer graceful fallback
    if (error.code === "auth/popup-blocked" || error.code === "auth/unauthorized-domain") {
      alert("Firebase Notice: Domain authorization is pending in Firebase Console for this domain. A local guest session has been activated.");
      currentUser = {
        uid: "pilot-zenin-guest",
        displayName: "Guest Pilot",
        email: "pilot@zeninxparth.internal",
        photoURL: "https://api.dicebear.com/7.x/bottts/svg?seed=Ghostofzenin",
        isAnonymous: true
      };
      localStorage.setItem("zenin_auth_user", JSON.stringify(currentUser));
      notifySubscribers(currentUser);
      return currentUser;
    }
    throw error;
  }
}

export async function logoutUser() {
  if (auth) {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("SignOut notice:", e);
    }
  }
  currentUser = null;
  localStorage.removeItem("zenin_auth_user");
  notifySubscribers(null);
}

export function getCurrentUser() {
  return currentUser;
}
