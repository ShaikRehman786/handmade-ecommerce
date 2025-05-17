import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/pages-css/CreateAccount.css'



const CreateAccount = () => {
  return (
    <div className="container create-account-container">
      <h2>Create an Account</h2>
      <div className="account-options">
        <div className="account-option">
          <h3>Register as Customer</h3>
          <p>Create an account to shop and manage your orders.</p>
          <Link to="/customer/register" className="btn btn-secondary">
            Customer Register
          </Link>
        </div>
        <div className="account-option">
          <h3>Register as Artisan</h3>
          <p>Join as an artisan and showcase your products.</p>
          <Link to="/artisan/register" className="btn btn-primary">
            Artisan Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
