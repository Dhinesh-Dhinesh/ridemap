import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

//Pages
import LogIn from './pages/login/index.js';
import Home from './pages/home/index.js';
import NotFound from './pages/error/index.js';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}