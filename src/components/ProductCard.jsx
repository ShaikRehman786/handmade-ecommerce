import './product-css/ProductCard.css';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
      <p>⭐ {product.rating || 4.5}</p>
      <div className="product-card-actions">
        {/* Just call onAddToCart with product */}
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        <button onClick={() => onViewDetails(product._id)}>View Details</button>
      </div>
    </div>
  );
};

export default ProductCard;
