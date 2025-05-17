import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setAmount(total * 100); 
  }, []);


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    if (amount <= 0) {
      alert('Cart is empty or amount is invalid.');
      return;
    }

    const options = {
      key: 'YOUR_RAZORPAY_KEY', 
      amount: amount, 
      currency: 'INR',
      name: 'Desi Etsy',
      description: 'Payment for your order',
      handler: function (response) {
        alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
        localStorage.removeItem('cart'); 
        navigate('/order-success');
      },
      prefill: {
        name: 'Shaik Rehman',
        email: 'shaikrehman78609@gmail.com',
        contact: '9999999999'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      <p>Total Amount: ₹{(amount / 100).toFixed(2)}</p>
      <button className="btn btn-primary" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default CheckoutPage;
