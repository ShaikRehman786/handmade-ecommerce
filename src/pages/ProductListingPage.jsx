import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pages/pages-css/ProductListing.css';

const dummyProducts = [
  { _id: '1', name: 'Handmade Vase', category: 'Decor', price: 1200, rating: 4.5, image: 'https://clayartgallery.in/cdn/shop/files/rn-image_picker_lib_temp_f5d8e0d5-df87-4af5-9026-281024edce1f.jpg?v=1719685859&width=1445' },
  { _id: '2', name: 'Woven Basket', category: 'Storage', price: 800, rating: 4.0, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Handmade_basket_kudzu.jpg/250px-Handmade_basket_kudzu.jpg' },
  { _id: '3', name: 'Ceramic Plate', category: 'Kitchen', price: 600, rating: 4.7, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Faience_Plate_Melograno.jpg/500px-Faience_Plate_Melograno.jpg' },
  { _id: '4', name: 'Wooden Chair', category: 'Furniture', price: 4500, rating: 4.8, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Typical_Adirondack_chair_in_eastern_Ohio.jpg/250px-Typical_Adirondack_chair_in_eastern_Ohio.jpg' },
  { _id: '5', name: 'Bamboo Lamp', category: 'Lighting', price: 1500, rating: 4.3, image: 'https://5.imimg.com/data5/SELLER/Default/2023/8/333636500/DR/JF/AC/120902258/bamboo-lamp.jpg' },
  { _id: '6', name: 'Cotton Bed Sheet', category: 'Bedroom', price: 999, rating: 4.2, image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Futons_in_a_Ryokan_-_2.jpg' },
  { _id: '7', name: 'Wall Art Canvas', category: 'Decor', price: 1300, rating: 4.6, image: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/19/Pablo_Picasso%2C_1913%2C_Violin_Hanging_on_the_Wall%2C_oil%2C_spackle_with_sand%2C_enamel%2C_and_charcoal_on_canvas%2C_65_x_46_cm%2C_Museum_of_Fine_Arts_Berne.jpg/1445px-Pablo_Picasso%2C_1913%2C_Violin_Hanging_on_the_Wall%2C_oil%2C_spackle_with_sand%2C_enamel%2C_and_charcoal_on_canvas%2C_65_x_46_cm%2C_Museum_of_Fine_Arts_Berne.jpg' },
  { _id: '8', name: 'Essential Oil Diffuser', category: 'Wellness', price: 1100, rating: 4.4, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/DavanaEssOil.png/250px-DavanaEssOil.png' },
  { _id: '9', name: 'Stainless Steel Cutlery Set', category: 'Kitchen', price: 750, rating: 4.5, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Feldbesteck_Bundeswehr_TSR_81.jpg/250px-Feldbesteck_Bundeswehr_TSR_81.jpg' },
  { _id: '10', name: 'Fabric Sofa Cover', category: 'Furniture', price: 1299, rating: 4.1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFU6O6f8DbP7HiD8WmXvHVVOF8IxTtvGH5Og&s' },
  { _id: '11', name: 'Terracotta Planter', category: 'Gardening', price: 550, rating: 4.3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmo1vpmNJ5X6OLprb_dBtU1mK27BRUEu6Aog&s' },
  { _id: '12', name: 'Fridge Organizer Set', category: 'Storage', price: 699, rating: 4.0, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAlzE6906NmA_PlhCD9cD67XtOVcQ5mZfkvw&s' },
  { _id: '13', name: 'Woolen Throw Blanket', category: 'Living Room', price: 1800, rating: 4.7, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVmuLIRZO3UEi0cM5Z4KCFkoYYzEGxsABHNw&s' },
  { _id: '14', name: 'Hanging Macrame Shelf', category: 'Decor', price: 1200, rating: 4.6, image: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Macrame_.jpg' },
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
    <div
      className="slideshow"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      <div
        className="slides"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div className="slide" key={idx}>
            <img src={src} alt={`Banner ${idx + 1}`} />
          </div>
        ))}
      </div>
      <button className="prev" onClick={() => goTo(currentIndex - 1)}>
        ‹
      </button>
      <button className="next" onClick={() => goTo(currentIndex + 1)}>
        ›
      </button>
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
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
  const navigate = useNavigate();

  const getProducts = () => {
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    return storedProducts && storedProducts.length > 0 ? storedProducts : dummyProducts;
  };

  useEffect(() => {
    const allProducts = getProducts();
    setFilteredProducts(allProducts);
  }, []);

  const handleSearchClick = () => {
    const allProducts = getProducts();
    const filtered = allProducts.filter((product) => {
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

  const handleViewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All');
    setMinPrice('');
    setMaxPrice('');
    setFilteredProducts(getProducts());
  };

  const bannerImages = [
    'banner1.jpg',
    'banner2.jpg',
    'banner3.jpg',
    'banner4.jpg',
    'banner5.jpg',
  ];

  return (
    <div className="product-listing-page">
      <ToastContainer position="top-right" autoClose={2000} />
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearchClick}
      />
      <Slideshow images={bannerImages} interval={4000} />

      <div className="content-container">
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

          <button className="search-btn" onClick={handleSearchClick}>
            Apply Filters
          </button>
          <button className="reset-btn" onClick={handleResetFilters}>
            Reset Filters
          </button>
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
                  <div className="product-buttons">
                    <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    <button 
                      onClick={() => handleViewDetails(product._id)} 
                      className="view-details-btn"
                    >
                      View Details
                    </button>
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