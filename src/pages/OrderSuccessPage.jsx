import React from 'react';

const OrderSuccessPage = () => {
  return (
    <div className="container mt-5 text-center">
      <h2 className="text-success">🎉 Order Successful!</h2>
      <p>Thank you for shopping with us.</p>
      <a className="btn btn-primary mt-3" href="/">Back to Home</a>
    </div>
  );
};

export default OrderSuccessPage;
