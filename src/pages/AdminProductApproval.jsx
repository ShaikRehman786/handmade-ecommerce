import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProductApproval = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/products')
      .then(response => setProducts(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleApprove = (productId) => {
    axios.post(`http://localhost:5000/api/admin/approve-product/${productId}`)
      .then(response => {
        alert('Product approved');
        setProducts(products.filter(product => product._id !== productId)); // Remove approved product from list
      })
      .catch(err => console.error(err));
  };

  const handleReject = (productId) => {
    axios.post(`http://localhost:5000/api/admin/reject-product/${productId}`)
      .then(response => {
        alert('Product rejected');
        setProducts(products.filter(product => product._id !== productId)); // Remove rejected product from list
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h2>Product Approval</h2>
      <div className="row">
        {products.map(product => (
          <div className="col-md-4" key={product._id}>
            <div className="card mb-4">
              <img src={product.image} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">₹{product.price}</p>
                <button className="btn btn-success" onClick={() => handleApprove(product._id)}>Approve</button>
                <button className="btn btn-danger ml-2" onClick={() => handleReject(product._id)}>Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductApproval;
