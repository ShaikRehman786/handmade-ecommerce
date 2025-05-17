import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../pages/pages-css/ProductDetailPage.css'


const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Load products from localStorage instead of API
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    if (storedProducts) {
      const foundProduct = storedProducts.find((p) => p._id === id);
      setProduct(foundProduct || null);
    }
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = existingCart.findIndex((item) => item._id === product._id);
    if (index !== -1) {
      existingCart[index].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="container" style={{ padding: '1rem' }}>
      <h2>{product.name}</h2>
      <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} width="300" />
      <p>Price: ₹{product.price}</p>
      <p>Rating: ⭐{product.rating || 'N/A'}</p>
      <p>Description: {product.description || 'No description available.'}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetailPage;
