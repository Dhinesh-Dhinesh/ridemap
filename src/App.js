import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom"

//Navbar
import BottomNav from './components/bottomNav'
//Auth
import { useAuth } from './firebase/firebase';

//Loading
import Loading from './components/Loading'

//context
import { BottomContext } from './context/BottomContext';

//Lazy Component Pages
const LazyLogIn = lazy(() => import('./pages/login/index.js'));
const LazyHome = lazy(() => import('./pages/home/index.js'));
const LazyBusRoutes = lazy(() => import('./pages/routes/routes'));
const LazyNotification = lazy(() => import('./pages/notification/notification'));
const LazyProfile = lazy(() => import('./pages/profile/profile'));
const LazyNotFound = lazy(() => import('./pages/error/index.js'));

export default function App() {

  const user = useAuth();

  const [locationPath, setLocationPath] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let location = useLocation();

  //notification
  const [isNotification, setIsNotification] = useState(false);


  useEffect(() => {
    setLocationPath(location.pathname);
  }, [location]);

  return (
    <>
      <BottomContext.Provider value={{ isDrawerOpen, setIsDrawerOpen, isNotification, setIsNotification }} >
        {
          user && locationPath !== '/permissions' ? (
            <BottomNav />
          ) : null
        }
        <Routes>
          <Route exact path="/" element={<LazyLogIn />} />
          <Route exact path="/home" element={user ? <Suspense fallback={<Loading />}><LazyHome /></Suspense> : <Navigate to="/" />} />
          <Route exact path="/routes" element={user ? <LazyBusRoutes /> : <Navigate to="/" />} />
          <Route exact path="/notification" element={user ? <Suspense fallback={<Loading />}><LazyNotification /></Suspense> : <Navigate to="/" />} />
          <Route exact path="/profile" element={user ? <Suspense fallback={<Loading />}><LazyProfile /></Suspense> : <Navigate to="/" />} />
          <Route exact path="*" element={<Suspense fallback={<Loading />}><LazyNotFound /></Suspense>} />
        </Routes>
      </BottomContext.Provider>
    </>
  )
}