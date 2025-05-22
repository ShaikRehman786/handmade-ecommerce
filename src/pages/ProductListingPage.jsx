import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductContext } from '../pages/ProductContext';
import '../pages/pages-css/ProductListing.css';

const categories = ['All', 'Decor', 'Storage', 'Kitchen', 'Furniture'];

// Header Component
const Header = ({ searchTerm, setSearchTerm }) => (
  <header className="sticky-header">
    <input
      type="text"
      placeholder="Search for products, brands and more…"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </header>
);

// Banner Slider Component
const BannerSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="banner-slider">
      <img src={images[current]} alt={`Banner ${current + 1}`} />
    </div>
  );
};

const ProductListingPage = () => {
  const { products } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const bannerImages = [
    '/images/banner1.jpg',
    '/images/banner2.jpg',
    '/images/banner3.jpg',
    '/images/banner4.jpg',
    '/images/banner5.jpg',
  ];

  const getProducts = () => {
    const stored = JSON.parse(localStorage.getItem('products'));
    return stored && stored.length > 0 ? stored : products;
  };

  // Save products to localStorage when they change, and initialize filteredProducts
  useEffect(() => {
    if (products && products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
    setFilteredProducts(getProducts());
  }, [products]);

  // Apply filters whenever filter state changes
  useEffect(() => {
    applyFilters();
  }, [searchTerm, categoryFilter, minPrice, maxPrice]);

  const applyFilters = () => {
    const allProducts = getProducts();
    const filtered = allProducts.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = categoryFilter === 'All' || product.category === categoryFilter;
      const minMatch = minPrice === '' || product.price >= Number(minPrice);
      const maxMatch = maxPrice === '' || product.price <= Number(maxPrice);
      return nameMatch && categoryMatch && minMatch && maxMatch;
    });
    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex((item) => item._id === product._id);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`${product.name} added to cart!`);
  };

  const handleViewDetails = (id) => navigate(`/products/${id}`);

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All');
    setMinPrice('');
    setMaxPrice('');
    setFilteredProducts(getProducts());
  };

  return (
    <div className="product-listing-page">
      <ToastContainer position="top-right" autoClose={2000} />
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BannerSlider images={bannerImages} />

      <div className="content-container">
        <aside className="filters-sidebar">
          <h3>Filters</h3>

          <div className="filter-group">
            <label>Category</label>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <div className="price-range">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="₹0"
                min="0"
              />
              <span>to</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="₹∞"
                min="0"
              />
            </div>
          </div>

          <button className="search-btn" onClick={applyFilters}>Apply Filters</button>
          <button className="reset-btn" onClick={handleResetFilters}>Reset Filters</button>
        </aside>

        <main className="products-area">
          <h2>Products</h2>
          {filteredProducts.length === 0 ? (
            <p>No products found matching your criteria.</p>
          ) : (
            <div className="product-listing-grid">
              {filteredProducts.map((product) => (
                <div key={product._id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>Category: {product.category}</p>
                  <p>Price: ₹{product.price}</p>
                  <p>Rating: 4.2⭐{product.rating}</p>
                  <div className="product-buttons">
                    <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    <button onClick={() => handleViewDetails(product._id)} className="view-details-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductListingPage;
