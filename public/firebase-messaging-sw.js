// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAKHUHbrh_mhnT4lTunhc6O-czbl4HzcXo",
  authDomain: "ridemap-11f0c.firebaseapp.com",
  databaseURL: "https://ridemap-11f0c-default-rtdb.firebaseio.com",
  projectId: "ridemap-11f0c",
  storageBucket: "ridemap-11f0c.appspot.com",
  messagingSenderId: "612215196591",
  appId: "1:612215196591:web:02462c396d28390a9f3d5a",
  measurementId: "G-FHBYXL81DK"
};


firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});