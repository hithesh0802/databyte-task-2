importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCyBL-kmoGazW_oqmIHozWon8o4YYJGLdc",
  authDomain: "taskify-44cef.firebaseapp.com",
  projectId: "taskify-44cef",
  storageBucket: "taskify-44cef.appspot.com",
  messagingSenderId: "28674577969",
  appId: "1:28674577969:web:6e581715cf4a4671336710",
  measurementId: "G-QX6ZSLFWSC"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    console.log(payload.notification);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
})
