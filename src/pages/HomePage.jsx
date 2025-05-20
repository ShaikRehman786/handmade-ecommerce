import React, { useState, useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductContext } from '../pages/ProductContext'; // ✅ Import the ProductContext
import '../pages/pages-css/HomePage.css'

const HomePage = () => {
  const { products, setProducts } = useContext(ProductContext); // ✅ Using context for products
  const [localProducts, setLocalProducts] = useState([]);

  // Fetch products from local storage if no context is available
  const fetchProducts = () => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setLocalProducts(JSON.parse(savedProducts));
    } else {
      setLocalProducts([]);
    }
  };

  useEffect(() => {
    // Fetch products either from context or local storage
    if (!products) {
      fetchProducts();
    }

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
  }, [products]); // Use context products as dependency

  const handleAddToCart = () => {
    // Logic for adding to cart (to be implemented)
  };

  const productsToDisplay = products || localProducts; // Fallback to local products if context is empty

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2 className="my-4">Shop Handmade Products</h2>
      {productsToDisplay.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="row">
          {productsToDisplay.map((product) => (
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
