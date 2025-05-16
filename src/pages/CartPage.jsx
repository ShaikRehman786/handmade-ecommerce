import React from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  return (
    <div className="container">
      <h2>Your Cart</h2>
      <div className="cart-item">
        <p>Product 1 - ₹500</p>
        <button className="btn btn-danger">Remove</button>
      </div>
      <Link to="/checkout" className="btn btn-primary">Proceed to Checkout</Link>
    </div>
  );
};

export default CartPage;
