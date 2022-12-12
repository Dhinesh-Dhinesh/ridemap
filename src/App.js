import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"

//Navbar
import BottomNav from './components/bottomNav'
//Auth
import { useAuth } from './firebase/firebase';

//Loading
import Loading from './components/Loading'

//context
import { BottomContext } from './context/BottomContext';

import SignUp from './pages/signup/index'
import EmailVerify from './pages/verifyemail/index'

//Lazy Component Pages
const LazyLogIn = lazy(() => import('./pages/login/index.js'));
const LazyHome = lazy(() => import('./pages/home/index.js'));
const LazyBusRoutes = lazy(() => import('./pages/routes/routes'));
const LazyNotification = lazy(() => import('./pages/notification/notification'));
const LazyProfile = lazy(() => import('./pages/profile/profile'));
const LazyResetPassword = lazy(()=> import('./pages/reset_password/index'));


export default function App() {

  const user = useAuth();

  const Navigate = useNavigate();

  const [locationPath, setLocationPath] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let location = useLocation();

  //notification
  const [isNotification, setIsNotification] = useState(false);

  const [isUserEmailVerified,setIsUserEmailVerified] = useState(false);

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
  },[user]);

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
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/verify-email" element={<EmailVerify />} />
          <Route exact path="/reset-password" element={<Suspense fallback={<Loading />}><LazyResetPassword /></Suspense>} />
          <Route exact path="/home" element={isUserEmailVerified ? <Suspense fallback={<Loading />}><LazyHome /></Suspense> : <Navigate to="/" />} />
          <Route exact path="/routes" element={isUserEmailVerified ? <LazyBusRoutes /> : <Navigate to="/" />} />
          <Route exact path="/notification" element={isUserEmailVerified ? <Suspense fallback={<Loading />}><LazyNotification /></Suspense> : <Navigate to="/" />} />
          <Route exact path="/profile" element={isUserEmailVerified ? <Suspense fallback={<Loading />}><LazyProfile /></Suspense> : <Navigate to="/" />} />
        </Routes>
      </BottomContext.Provider>
    </>
  )
}