import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pages/pages-css/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {

      localStorage.setItem('userRole', role);

      toast.success('Login successful!', {
        position: 'top-center',
        autoClose: 2000,
        onClose: () => {
          if (role === 'customer') {
            navigate('/');
          } else if (role === 'artisan') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }
      });
    }, 500);
  };

  return (
    <div className="container login-container">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1} 
      />
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
          <label>Select Role</label>
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="customer">Customer</option>
            <option value="artisan">Artisan</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      <p className="mt-3">
        Don't have an account?{' '}
        <Link to="/create-account" className="signin-link">
          Create one here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
