import React from "react";
import { NavBar } from "./coomponents/Layout/NavBar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Cart } from "./coomponents/Cart/Cart.jsx";
import { Profile } from "./coomponents/Auth/Profile.jsx";
import Auth from "./pages/Auth";
import LandingPage from "./pages/LandingPage";
import './styles/global.css';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
