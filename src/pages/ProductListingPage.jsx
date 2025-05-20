import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductContext } from '../pages/ProductContext'; // ✅ Import ProductContext
import '../pages/pages-css/ProductListing.css';

const categories = ['All', 'Decor', 'Storage', 'Kitchen', 'Furniture'];

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
  const { products, setProducts } = useContext(ProductContext); // ✅ Use context to manage products
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products from context and localStorage
  const getProducts = () => {
    const stored = JSON.parse(localStorage.getItem('products'));
    // Merging products from context and localStorage, to ensure the latest products are reflected
    return stored && stored.length > 0 ? stored : products; // Fallback to context if localStorage is empty
  };

  // Update the filtered products based on the context
  useEffect(() => {
    // Sync context products to localStorage if products change
    if (products && products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products)); // Update localStorage with context products
    }
    setFilteredProducts(getProducts()); // Trigger filter update with latest products
  }, [products]); // Trigger update when products change

  // Apply the search and filter criteria
  const applyFilters = () => {
    const allProducts = getProducts();
    const filtered = allProducts.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = categoryFilter === 'All' || product.category === categoryFilter;
      const minMatch = minPrice === '' || product.price >= Number(minPrice);
      const maxMatch = maxPrice === '' || product.price <= Number(maxPrice);
      return nameMatch && categoryMatch && minMatch && maxMatch;
    });
    setFilteredProducts(filtered); // Set the filtered products in state
  };

  // Add the product to the cart
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

  // Navigate to the product detail page
  const handleViewDetails = (id) => navigate(`/products/${id}`);

  // Reset the filters to default
  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All');
    setMinPrice('');
    setMaxPrice('');
    setFilteredProducts(getProducts()); // Reset to all products
  };

  return (
    <div className="product-listing-page">
      <ToastContainer position="top-right" autoClose={2000} />
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={applyFilters} />

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
