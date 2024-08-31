// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyBL-kmoGazW_oqmIHozWon8o4YYJGLdc",
  authDomain: "taskify-44cef.firebaseapp.com",
  projectId: "taskify-44cef",
  storageBucket: "taskify-44cef.appspot.com",
  messagingSenderId: "28674577969",
  appId: "1:28674577969:web:6e581715cf4a4671336710",
  measurementId: "G-QX6ZSLFWSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);