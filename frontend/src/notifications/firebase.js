import { initializeApp } from "firebase/app";
import {getMessaging,getToken} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCyBL-kmoGazW_oqmIHozWon8o4YYJGLdc",
  authDomain: "taskify-44cef.firebaseapp.com",
  projectId: "taskify-44cef",
  storageBucket: "taskify-44cef.appspot.com",
  messagingSenderId: "28674577969",
  appId: "1:28674577969:web:6e581715cf4a4671336710",
  measurementId: "G-QX6ZSLFWSC"
};

const app = initializeApp(firebaseConfig);

const messaging= getMessaging(app);

export { messaging };

export const generateToken= async()=>{
    const permission= await Notification.requestPermission();
    console.log(permission);

    try {
      if (permission === 'granted') {
          const token = await getToken(messaging, {
              vapidKey: 'BK4Owkznt8KXaFBEUQyiX4143y4wNjICrKZhtMmuOGCGIILjTsl0QZRCEfEzNni0UHbs3r6QUjGTTjjcIM1zH5I',
          });
          console.log('Token:', token);
          return token;
      } else {
          console.warn('Permission not granted for notifications');
      }
  } catch (error) {
      console.error('An error occurred while retrieving token. ', error);
  }
}
