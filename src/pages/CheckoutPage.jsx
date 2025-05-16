import React from 'react';
import Razorpay from 'razorpay';

const CheckoutPage = () => {
  const handlePayment = () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY', 
      amount: 1000, 
      currency: 'INR',
      name: 'Desi Etsy',
      description: 'Payment for your order',
      handler: function (response) {
        alert('Payment Successful: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'Customer',
        email: 'customer@example.com',
        contact: '1234567890'
      }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      <button className="btn btn-success" onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default CheckoutPage;
