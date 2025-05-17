import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pages/pages-css/HomePage.css'


const HomePage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();

    const handleStorageChange = (e) => {
      if (e.key === 'products') {
        fetchProducts();
        toast.info('Products updated (from another tab)');
      }
    };

    const handleProductsUpdated = () => {
      fetchProducts();
      toast.info('Products updated (in this tab)');
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchProducts();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('productsUpdated', handleProductsUpdated);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('productsUpdated', handleProductsUpdated);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleAddToCart = (product) => {

  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2 className="my-4">Shop Handmade Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product._id || product.name} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="light"
      />
    </div>
  );
};

export default HomePage;
