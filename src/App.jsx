import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ArtisanRegister from './pages/ArtisanRegister';
import ArtisanDashboard from './pages/ArtisanDashboard';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/artisan/register" element={<ArtisanRegister />} />
        <Route path="/artisan/dashboard" element={<ArtisanDashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default App;
