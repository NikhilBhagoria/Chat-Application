import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MatchPage from './pages/MatchPage';
// import VideoChatPage from './pages/VideoChatPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/match" element={<MatchPage/>} />
        {/* <Route path="/video/:roomId" element={<VideoChatPage/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;