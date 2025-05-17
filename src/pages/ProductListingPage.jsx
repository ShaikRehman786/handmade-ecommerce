import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pages/pages-css/ProductListing.css';

const dummyProducts = [
  {
    _id: '1',
    name: 'Handmade Vase',
    category: 'Decor',
    price: 1200,
    rating: 4.5,
    image: 'https://via.placeholder.com/150',
  },
  {
    _id: '2',
    name: 'Woven Basket',
    category: 'Storage',
    price: 800,
    rating: 4.0,
    image: 'https://via.placeholder.com/150',
  },
  {
    _id: '3',
    name: 'Ceramic Plate',
    category: 'Kitchen',
    price: 600,
    rating: 4.7,
    image: 'https://via.placeholder.com/150',
  },
  {
    _id: '4',
    name: 'Wooden Chair',
    category: 'Furniture',
    price: 4500,
    rating: 4.8,
    image: 'https://via.placeholder.com/150',
  },
];

const categories = ['All', 'Decor', 'Storage', 'Kitchen', 'Furniture'];

const ProductListingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);

  const navigate = useNavigate();

  const handleSearchClick = () => {
    const filtered = dummyProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
      const matchesMinPrice = minPrice === '' || product.price >= Number(minPrice);
      const matchesMaxPrice = maxPrice === '' || product.price <= Number(maxPrice);
      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });
    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    const index = existingCart.findIndex((item) => item._id === product._id);
    if (index !== -1) {
      existingCart[index].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    toast.success(`${product.name} added to cart!`);
  };

  const handleViewDetails = (productName) => {
    toast.info(`Viewing details for ${productName}`);
  };

  return (
    <div className="product-listing-page">
      <ToastContainer position="top-right" autoClose={3000} />

      <aside className="filters-sidebar">
        <h3>Filters</h3>

        <div className="filter-group">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Min Price</label>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min="0"
          />
        </div>

        <div className="filter-group">
          <label>Max Price</label>
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min="0"
          />
        </div>

        <button className="search-btn" onClick={handleSearchClick}>Search</button>
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
                <p>Rating: ⭐{product.rating}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                <button
                  onClick={() => handleViewDetails(product.name)}
                  className="view-details-btn"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductListingPage;
