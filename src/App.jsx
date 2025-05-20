import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
  const userRole = localStorage.getItem('userRole');

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

        {/* Always declare routes, check role inside component if needed */}
        <Route path="/artisan/dashboard" element={
          userRole === 'artisan' ? <ArtisanDashboard /> : <Navigate to="/login" />
        } />

        <Route path="/admin" element={
          userRole === 'admin' ? <AdminPanel /> : <Navigate to="/" />
        } />

        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
