import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pages/pages-css/ProductListing.css';

// If using images from assets folder:
// import banner1 from '../assets/banner1.jpeg';
// import banner2 from '../assets/banner2.jpg';
// import banner3 from '../assets/banner3.jpg';
// import banner4 from '../assets/banner4.jpg';
// import banner5 from '../assets/banner5.jpg';

const dummyProducts = [
  // [your same product array here]
];

const categories = ['All', 'Decor', 'Storage', 'Kitchen', 'Furniture', 'Lighting', 'Bedroom', 'Wellness', 'Gardening', 'Living Room'];

const Slideshow = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef();

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [currentIndex]);

  const startAuto = () => {
    stopAuto();
    timerRef.current = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, interval);
  };

  const stopAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const goTo = (i) => setCurrentIndex((i + images.length) % images.length);

  return (
    <div className="slideshow" onMouseEnter={stopAuto} onMouseLeave={startAuto}>
      <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((src, idx) => (
          <div className="slide" key={idx}>
            <img src={src} alt={`Banner ${idx + 1}`} className="banner-image" />
          </div>
        ))}
      </div>
      <button className="prev" onClick={() => goTo(currentIndex - 1)}>‹</button>
      <button className="next" onClick={() => goTo(currentIndex + 1)}>›</button>
      <div className="dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => goTo(idx)}
          />
        ))}
      </div>
    </div>
  );
};

const Header = ({ searchTerm, setSearchTerm, onSearch }) => (
  <header className="sticky-header">
    <input
      type="text"
      placeholder="Search for products, brands and more…"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button onClick={onSearch}>Search</button>
  </header>
);

const ProductListingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = () => {
    const stored = JSON.parse(localStorage.getItem('products'));
    return stored && stored.length > 0 ? stored : dummyProducts;
  };

  useEffect(() => {
    setFilteredProducts(getProducts());
  }, []);

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

  // const bannerImages = [banner1]; // Add other images as needed

  return (
    <div className="product-listing-page">
      <ToastContainer position="top-right" autoClose={2000} />
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={applyFilters} />
      {/* <Slideshow images={bannerImages} interval={4000} /> */}

      <div className="content-container">
        <aside className="filters-sidebar">
          <h3>Filters</h3>
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
            />
          </div>
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
