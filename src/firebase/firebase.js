import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


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
export const auth = getAuth(app);
export const db = getDatabase(app);
export const firestoreDB = getFirestore(app);
export const storage = getStorage(app);

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  return signOut(auth);
}

export async function signUp(name, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Signed in 

    const { user } = userCredential;

    await updateProfile(user, {
      displayName: name
    })

    const userRef = doc(firestoreDB, "users", userCredential.user.uid);
    await setDoc(userRef, {
      name,
      email,
      notf_unread: false,
    });

    await sendEmailVerification(user);

  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      return false;
    }
    console.log(error)
  }
}

//-------------
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(user)

      if (user) {
        sessionStorage.setItem('isLoggedIn', true);
        sessionStorage.setItem("uid", user.uid);
      }

    })
    return unsub;
  }, [])

  return currentUser;
}