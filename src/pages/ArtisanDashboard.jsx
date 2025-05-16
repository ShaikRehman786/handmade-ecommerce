import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArtisanDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products/artisan')
      .then(response => setProducts(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Your Products</h2>
      <div className="row">
        {products.map(product => (
          <div className="col-md-4" key={product._id}>
            <div className="card mb-4">
              <img src={product.image} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">₹{product.price}</p>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger ml-2">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtisanDashboard;
