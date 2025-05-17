import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ArtisanRegister from './pages/ArtisanRegister';
import CustomerRegister from './pages/CustomerRegister';
import ArtisanDashboard from './pages/ArtisanDashboard';
import AdminPanel from './pages/AdminPanel';
import LoginPage from './pages/LoginPage';
import CreateAccount from './pages/CreateAccount';
import ProductListingPage from './pages/ProductListingPage';
import OrderSuccessPage from './pages/OrderSuccessPage';




function App() {
  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/" element={<ProductListingPage />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/artisan/register" element={<ArtisanRegister />} />

        <Route path="/artisan/dashboard" element={<ArtisanDashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
      </Routes>
    </>
  );
}

export default App;
