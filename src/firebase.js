import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCJbdCqpUEBg722fUXRPKDGlqY8Es-8wvI",
  authDomain: "otpproject-979d9.firebaseapp.com",
  projectId: "otpproject-979d9",
  storageBucket: "otpproject-979d9.appspot.com",
  messagingSenderId: "787974531492",
  appId: "1:787974531492:web:639b966e435baea1acb931",
  measurementId: "G-YBGC5RVCJB"
};
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
