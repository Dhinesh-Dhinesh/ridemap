import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"

//Firebase
import { firestoreDB } from './firebase/firebase';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';

//Navbar
import BottomNav from './components/bottomNav'
//Auth
import { useAuth } from './firebase/firebase';

//Loading
import Loading from './components/Loading'

//context
import { BottomContext } from './context/BottomContext';

// import SignUp from 
import Home from './pages/home/index.js'
import BusRoutes from './pages/routes/routes';
import Profile from './pages/profile/profile';

//Lazy Component Pages
const LazyLogIn = lazy(() => import('./pages/login/index.js'));
const LazyNotification = lazy(() => import('./pages/notification/notification'));
const LazyResetPassword = lazy(() => import('./pages/reset_password/index'));
const LazySignUp = lazy(() => import('./pages/signup/index'));
const LazyEmailVerify = lazy(() => import('./pages/verifyemail/index'));
const LazyIssue = lazy(() => import('./pages/issue/index'));
const LazyDocs = lazy(() => import('./pages/howto/index'));

export default function App() {

  const user = useAuth();

  const Navigate = useNavigate();

  const [locationPath, setLocationPath] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  let location = useLocation();

  //notification
  const [isNotification, setIsNotification] = useState(false);

  const [isUserEmailVerified, setIsUserEmailVerified] = useState(false);

  useEffect(() => {
    setLocationPath(location.pathname);

  }, [location]);

  useEffect(() => {
    if (user) {
      if (user.emailVerified === false) {
        setIsUserEmailVerified(false);
      } else {
        setIsUserEmailVerified(true);
      }
    }
  }, [user]);

  useEffect(() => {
    var token = window?.fcmToken?.getFcmToken();

    if (user) {
      if (location.pathname === "/home" && token) {
        if (sessionStorage.getItem("isHomeLoad") === null) {
          // setToken in firebase firebase firestore
          let notfToken = doc(firestoreDB, "users", `${user.uid}`)
          updateDoc(notfToken, {
            token: arrayUnion(token)
          })
          alert("Token set in firebase");
          sessionStorage.setItem("isHomeLoad", true);
        }
      }
    }
  }, [user, location]);

  return (
    <>
      <BottomContext.Provider value={{ isDrawerOpen, setIsDrawerOpen, isNotification, setIsNotification }} >
        {
          isUserEmailVerified && locationPath !== '/verify-email' && locationPath !== '/' ? (
            <BottomNav />
          ) : null
        }
        <Routes>
          <Route exact path="/" element={<LazyLogIn />} />
          <Route exact path="/home" element={isUserEmailVerified ? <Home /> : <Navigate to="/" />} />
          <Route exact path="/signup" element={<Suspense fallback={<Loading />}><LazySignUp /></Suspense>} />
          <Route exact path="/verify-email" element={<Suspense fallback={<Loading />}><LazyEmailVerify /></Suspense>} />
          <Route exact path="/reset-password" element={<Suspense fallback={<Loading />}><LazyResetPassword /></Suspense>} />
          <Route exact path="/routes" element={isUserEmailVerified ? <BusRoutes /> : <Navigate to="/" />} />
          <Route exact path="/notification" element={isUserEmailVerified ? <Suspense fallback={<Loading />}><LazyNotification /></Suspense> : <Navigate to="/" />} />
          <Route exact path="/profile" element={isUserEmailVerified ? <Profile /> : <Navigate to="/" />} />
          <Route exact path="/issue" element={isUserEmailVerified ? <Suspense fallback={<Loading />}><LazyIssue /></Suspense> : <Navigate to="/" />} />
          <Route exact path="/docs" element={isUserEmailVerified ? <Suspense fallback={<Loading />}><LazyDocs /></Suspense> : <Navigate to="/" />} />
        </Routes>
      </BottomContext.Provider>
    </>
  )
}