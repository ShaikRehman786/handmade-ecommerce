import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './page-css/ProductListingPage.css'; // Optional custom styles
import { useHistory } from 'react-router-dom';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/approved');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    // Logic for adding to cart (to be implemented)
    console.log('Add to Cart:', product);
  };

  const handleViewDetails = (productId) => {
    history.push(`/product/${productId}`);
  };

  return (
    <div className="product-listing-container">
      <h2>All Handmade Products</h2>
      <div className="product-listing-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;
