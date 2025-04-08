import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Cart } from "./coomponents/Cart/Cart.jsx";
import { Profile } from "./coomponents/Auth/Profile.jsx";
import { Auth } from "./pages/Auth";
import { LandingPage } from "./pages/LandingPage";
import './styles/global.css';
import { Layout } from "./coomponents/Layout/Layout.jsx";
import { BooksContainer } from "./pages/ListBook.jsx";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/books" element={<BooksContainer />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}
