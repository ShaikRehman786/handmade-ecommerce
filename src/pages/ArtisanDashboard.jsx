import React, { useEffect, useState } from 'react';

const ArtisanDashboard = () => {
  const [artisanInfo, setArtisanInfo] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {

    setTimeout(() => {
      setArtisanInfo({
        name: 'John Artisan',
        email: 'john.artisan@example.com',
        phone: '123-456-7890'
      });

      setProducts([
        { id: 1, name: 'Handmade Vase', price: 25 },
        { id: 2, name: 'Wooden Chair', price: 150 },
        { id: 3, name: 'Custom Painting', price: 100 }
      ]);
    }, 500);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Welcome, {artisanInfo ? artisanInfo.name : 'Artisan'}!</h2>

      <p className="lead">
        Here in your dashboard, you can:
        <ul>
          <li>View and manage your products</li>
          <li>Add new handmade crafts or services</li>
          <li>Update your artisan profile and contact details</li>
          <li>Track orders and customer requests (if implemented)</li>
        </ul>
      </p>

      {artisanInfo && (
        <div className="artisan-info mb-4">
          <p><strong>Email:</strong> {artisanInfo.email}</p>
          <p><strong>Phone:</strong> {artisanInfo.phone}</p>
        </div>
      )}

      <h3>Your Products</h3>
      {products.length > 0 ? (
        <ul className="list-group mb-4">
          {products.map(product => (
            <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
              {product.name}
              <span>${product.price}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found. Start adding your products!</p>
      )}

      <button
        className="btn btn-primary"
        onClick={() => alert('Redirect to product management page (to be implemented)')}
      >
        Manage Products
      </button>
    </div>
  );
};

export default ArtisanDashboard;
