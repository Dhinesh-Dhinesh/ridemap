import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate, useSearchParams } from "react-router-dom"

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

export default function App() {
  const [searchParams] = useSearchParams();

  const user = useAuth();

  const Navigate = useNavigate();

  const [locationPath, setLocationPath] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notfToken, setNotfToken] = useState('');
  let location = useLocation();

  //notification
  const [isNotification, setIsNotification] = useState(false);

  const [isUserEmailVerified, setIsUserEmailVerified] = useState(false);

  useEffect(() => {
    setLocationPath(location.pathname);
    if (location.pathname === '/') {
      var token = searchParams.get("token");

      if (token) {
        setNotfToken(token);
      }
    }
    //eslint-disable-next-line
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

  return (
    <>
      <BottomContext.Provider value={{ isDrawerOpen, setIsDrawerOpen, isNotification, setIsNotification, notfToken }} >
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
        </Routes>
      </BottomContext.Provider>
    </>
  )
}