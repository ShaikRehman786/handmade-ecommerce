import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pages/pages-css/ArtisanRegister.css';

const STORAGE_KEY = 'artisanUsers';

const ArtisanRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    shopName: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit triggered"); // ✅ Debug check

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    const emailExists = stored.some((user) => user.email === formData.email);
    if (emailExists) {
      toast.error('An account with this email already exists.');
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...stored, formData]));

    toast.success('Artisan registered successfully!');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="container">
      <h2>Register as an Artisan</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Shop Name:</label>
          <input
            type="text"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Register
        </button>
      </form>

      <p className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default ArtisanRegister;
