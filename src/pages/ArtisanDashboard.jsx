import React, { useState, useEffect, useContext } from 'react';
import '../pages/pages-css/ArtisanDashboard.css';
import { ProductContext } from '../pages/ProductContext'; // ✅ Import context

const ArtisanDashboard = () => {
  const [artisanInfo, setArtisanInfo] = useState(null);
  const { products: globalProducts, setProducts: setGlobalProducts } = useContext(ProductContext);
  const [localProducts, setLocalProducts] = useState([]);
  const products = globalProducts || localProducts;
  const setProducts = setGlobalProducts || setLocalProducts;

  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', image: '' });
  const [editProductId, setEditProductId] = useState(null);
  const [editProduct, setEditProduct] = useState({ name: '', price: '', description: '', image: '' });

  useEffect(() => {
    setArtisanInfo({
      name: 'John Artisan',
      email: 'john.artisan@example.com',
      phone: '123-456-7890',
    });

    // Only initialize local fallback if global context is not used
    if (!globalProducts) {
      setLocalProducts([
        {
          id: 1,
          name: 'Handmade Vase',
          price: 25,
          description: 'A beautiful handmade vase.',
          image: ''
        }
      ]);
    }
  }, [globalProducts]);

  const handleNewProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleNewImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setNewProduct({ ...newProduct, image: reader.result });
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleAddProduct = () => {
    const { name, price, description, image } = newProduct;
    if (name && price && description && image) {
      const newProductId = Date.now();
      setProducts([...products, { id: newProductId, ...newProduct, price: parseFloat(price) }]);
      setNewProduct({ name: '', price: '', description: '', image: '' });
    } else {
      alert('Please fill all product fields including image.');
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEditProductChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setEditProduct({ ...editProduct, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEditProduct = () => {
    const { name, price, description, image } = editProduct;
    if (name && price && description && image) {
      setProducts(products.map(product =>
        product.id === editProductId
          ? { ...product, name, price: parseFloat(price), description, image }
          : product
      ));
      setEditProductId(null);
      setEditProduct({ name: '', price: '', description: '', image: '' });
    } else {
      alert('Please fill all fields for the product.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Welcome, {artisanInfo ? artisanInfo.name : 'Artisan'}!</h2>

      <p className="lead">
        Here in your dashboard, you can:
        <ul>
          <li>View and manage your products</li>
          <li>Add new handmade crafts or services</li>
          <li>Update your artisan profile and contact details</li>
          <li>Track orders and customer requests (if implemented)</li>
        </ul>
      </p>

      {artisanInfo && (
        <div className="artisan-info mb-4">
          <p><strong>Email:</strong> {artisanInfo.email}</p>
          <p><strong>Phone:</strong> {artisanInfo.phone}</p>
        </div>
      )}

      {/* New Product Form */}
      <h3>Add New Product</h3>
      <div className="mb-4">
        <input type="text" className="form-control mb-2" name="name" value={newProduct.name} onChange={handleNewProductChange} placeholder="Enter product name" />
        <input type="number" className="form-control mb-2" name="price" value={newProduct.price} onChange={handleNewProductChange} placeholder="Enter product price" />
        <textarea className="form-control mb-2" name="description" value={newProduct.description} onChange={handleNewProductChange} placeholder="Enter product description"></textarea>
        <input type="file" className="form-control mb-2" accept="image/*" onChange={handleNewImageChange} />
        {newProduct.image && <img src={newProduct.image} alt="Preview" width="100" className="mb-2" />}
        <button className="btn btn-primary" onClick={handleAddProduct}>Add Product</button>
      </div>

      <h3>Your Products</h3>
      {products.length > 0 ? (
        <ul className="list-group mb-4">
          {products.map((product) => (
            <li key={product.id} className="list-group-item">
              {editProductId === product.id ? (
                <>
                  <input type="text" className="form-control mb-2" name="name" value={editProduct.name} onChange={handleEditProductChange} />
                  <input type="number" className="form-control mb-2" name="price" value={editProduct.price} onChange={handleEditProductChange} />
                  <textarea className="form-control mb-2" name="description" value={editProduct.description} onChange={handleEditProductChange}></textarea>
                  <input type="file" className="form-control mb-2" accept="image/*" onChange={handleEditImageChange} />
                  {editProduct.image && <img src={editProduct.image} alt="Preview" width="100" className="mb-2" />}
                  <button className="btn btn-success mr-2" onClick={handleSaveEditProduct}>Save</button>
                  <button className="btn btn-secondary" onClick={() => setEditProductId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <div><strong>{product.name}</strong> - ₹{product.price}</div>
                  <div><em>{product.description}</em></div>
                  {product.image && <img src={product.image} alt={product.name} width="100" className="mb-2" />}
                  <div className="mt-2">
                    <button className="btn btn-warning mr-2" onClick={() => { setEditProductId(product.id); setEditProduct({ ...product }); }}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found. Start adding your products!</p>
      )}
    </div>
  );
};

export default ArtisanDashboard;
