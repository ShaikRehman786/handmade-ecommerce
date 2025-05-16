import React, { useState } from 'react';
import axios from 'axios';

const ArtisanRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    shopName: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/artisan/register', formData)
      .then(response => alert('Artisan registered successfully'))
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h2>Register as an Artisan</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Shop Name</label>
          <input
            type="text"
            name="shopName"
            className="form-control"
            value={formData.shopName}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default ArtisanRegister;
