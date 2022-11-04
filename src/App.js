import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
//Pages
import LogIn from './pages/login/index.js';
import Home from './pages/home/index.js';
import NotFound from './pages/error/index.js';
import Profile from './pages/profile/profile';
import Notification from './pages/notification/notification';
import BusRoutes from './pages/routes/routes';

import BottomNav from './components/bottomNav'

import { Navigate } from 'react-router-dom';
import { useAuth } from './firebase/firebase';

export default function App() {

  const user = useAuth();

  return (
    <BrowserRouter>
      {
        user ? (
          <div className='fixed z-[10001] bottom-0 w-full'>
            <BottomNav />
          </div>) : null
      }
      <Routes>
        <Route exact path="/" element={<LogIn />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        <Route path="/routes" element={user ? <BusRoutes /> : <Navigate to="/" />} />
        <Route path="/notification" element={user ? <Notification /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}