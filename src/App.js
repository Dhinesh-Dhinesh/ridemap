import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
//Pages
import LogIn from './pages/login/index.js';
import Home from './pages/home/index.js';
import NotFound from './pages/error/index.js';
import Profile from './pages/profile/profile';
import Notification from './pages/notification/notification';
import BusRoutes from './pages/routes/routes';
import Permissions from './pages/permissions/index.js';
//context
import { BottomContext } from './contexts/bottomNavContext.js';
//Navbar
import BottomNav from './components/bottomNav'
//Auth
import { useAuth } from './firebase/firebase';

export default function App() {

  const user = useAuth();

  const [isBottomNavShown, setIsBottomNavShown] = useState(false);

  return (
    <BrowserRouter>
      <BottomContext.Provider value={{ isBottomNavShown, setIsBottomNavShown }} >
        {
          user ? (
            <BottomNav />
          ) : null
        }
        <Routes>
          <Route exact path="/" element={<LogIn />} />
          <Route path="/permissions" element={user ? <Permissions /> : <Navigate to="/" />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
          <Route path="/routes" element={user ? <BusRoutes /> : <Navigate to="/" />} />
          <Route path="/notification" element={user ? <Notification /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BottomContext.Provider>
    </BrowserRouter>
  )
}