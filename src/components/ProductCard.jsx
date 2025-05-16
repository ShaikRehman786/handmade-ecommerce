import './product-css/ProductCard.css';
import React from 'react';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
      <p>⭐ {product.rating || 4.5}</p>
      <div className="product-card-actions">
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        <button onClick={() => onViewDetails(product._id)}>View Details</button>
      </div>
    </div>
  );
};

export default ProductCard;
