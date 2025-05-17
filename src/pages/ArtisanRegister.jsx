import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../pages/pages-css/ArtisanRegister.css'


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

    axios.post('http://localhost:5000/api/artisan/register', formData)
      .then(response => {
        console.log('Registration success:', response.data);
        alert('Artisan registered successfully!');
        navigate('/login');
      })
      .catch(error => {
        console.error('Registration failed:', error);
        alert('Failed to register. Please try again.');
      });
  };

  return (
    <div className="container">
      <h2>Register as an Artisan</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control" />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-control" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required className="form-control" />
        </div>
        <div className="form-group">
          <label>Shop Name:</label>
          <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} required className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Register</button>
      </form>

      <p className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default ArtisanRegister;
