import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const dummyProducts = [
  {
    _id: '1',
    name: 'Handmade Vase',
    description: 'Beautiful handmade ceramic vase.',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    _id: '2',
    name: 'Wooden Bowl',
    description: 'Carved wooden bowl from natural oak.',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    _id: '3',
    name: 'Woven Basket',
    description: 'Handwoven basket perfect for storage.',
    price: 39.99,
    image: 'https://via.placeholder.com/150',
  },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setProducts(dummyProducts);
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item._id === product._id);
      if (existing) {

        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {

        return [...prevCart, { ...product, quantity: 1 }];
      }
    });


    const existsInCart = cart.find(item => item._id === product._id);
    if (existsInCart) {
      toast.success(`${product.name} quantity updated in cart!`);
    } else {
      toast.success(`${product.name} added to cart!`);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Shop Handmade Products</h2>

      <div className="row">
        {products.map(product => (
          <div className="col-md-4" key={product._id}>
            <ProductCard
              product={product}
              onAddToCart={handleAddToCart}  // Pass handleAddToCart, expects product param
              onViewDetails={(id) => console.log("View product:", id)} // optional
            />
          </div>
        ))}
      </div>

      <div className="my-4">
        <h4>Cart Items: {cart.reduce((total, item) => total + item.quantity, 0)}</h4>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default HomePage;
