import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
//Pages
import LogIn from './pages/login/index.js';
import Home from './pages/home/index.js';
import NotFound from './pages/error/index.js';

import ProtectRoute from './components/ProtectedRoute.js';

import { useAuth } from './firebase/firebase';

export default function App() {

  const user = useAuth();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LogIn />} />
        <Route path="/home" element={user ? <Home /> : <ProtectRoute />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}