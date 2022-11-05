import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, set, ref, onDisconnect, child, get } from "firebase/database";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getDatabase(app);
export const firestoreDB = getFirestore(app);

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  return signOut(auth);
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(user)

      if (user) {
        get(child(ref(db), `users/${user.uid}/signin`)).then((snapshot) => {
          if (snapshot.exists()) {
            if (snapshot.val() === 1) {
              async function logOutIfLoggedIn() {
                await logOut();
                window.location.reload();
              }
              logOutIfLoggedIn()
              console.log('user already signed in')
            } else {
              sessionStorage.setItem("uid", user.uid); //!get uid in logout handler
              set(ref(db, "users/" + user.uid + "/"), {
                signin: 1
              })
              const disRef = ref(db, "users/" + user.uid + "/signin");
              onDisconnect(disRef).set(0);
            }
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        })

      }
    });
    return unsub;
  }, [])

  return currentUser;
}