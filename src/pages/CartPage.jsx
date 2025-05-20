import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const increaseQty = (_id) => {
    const updatedCart = cart.map((item) =>
      item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decreaseQty = (_id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === _id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (_id) => {
    const updatedCart = cart.filter((item) => item._id !== _id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleProceedToBuy = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price ($)</th>
              <th>Quantity</th>
              <th>Total ($)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item._id}>
                <td>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>{item.name}</td>
                <td>{item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>{(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button className="btn btn-sm btn-secondary mr-1" onClick={() => decreaseQty(item._id)}>-</button>
                  <button className="btn btn-sm btn-secondary mr-1" onClick={() => increaseQty(item._id)}>+</button>
                  <button className="btn btn-sm btn-danger" onClick={() => removeItem(item._id)}>Remove</button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="4" className="text-right font-weight-bold">
                Total:
              </td>
              <td colSpan="2" className="font-weight-bold">
                {totalPrice.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {cart.length > 0 && (
        <button className="btn btn-success" onClick={handleProceedToBuy}>
          Proceed to Buy
        </button>
      )}
    </div>
  );
};

export default Cart;