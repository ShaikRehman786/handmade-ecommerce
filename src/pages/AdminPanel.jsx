import React, { useState, useEffect } from 'react';
import '../pages/pages-css/AdminPanel.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel = () => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts
      ? JSON.parse(savedProducts)
      : [
          {
            _id: '1',
            name: 'Handmade Vase',
            price: 1200,
            image: 'https://via.placeholder.com/150',
            description: 'A beautiful handmade vase.',
            decorType: 'Decor',
          },
          {
            _id: '2',
            name: 'Woven Basket',
            price: 800,
            image: 'https://via.placeholder.com/150',
            description: 'A durable woven basket.',
            decorType: 'Storage',
          },
        ];
  });

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [decorType, setDecorType] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const clearForm = () => {
    setName('');
    setPrice('');
    setImage('');
    setDescription('');
    setDecorType('');
    setEditingId(null);
  };

  const validateForm = () => {
    if (!name || !price || !image || !decorType) {
      toast.error('Please fill all required fields');
      return false;
    }
    if (isNaN(price) || Number(price) <= 0) {
      toast.error('Price must be a positive number');
      return false;
    }
    return true;
  };

  const handleAddOrUpdateProduct = () => {
    if (!validateForm()) return;

    if (editingId) {
      // Update existing product
      setProducts((prev) =>
        prev.map((p) =>
          p._id === editingId ? { _id: editingId, name, price: Number(price), image, description, decorType } : p
        )
      );
      clearForm();
      toast.success('Product updated successfully');
    } else {
      // Add new product
      const newProduct = {
        _id: Date.now().toString(),
        name,
        price: Number(price),
        image,
        description,
        decorType,
      };
      setProducts((prev) => [...prev, newProduct]);
      clearForm();
      toast.success('Product added successfully');
    }
    window.dispatchEvent(new Event('productsUpdated')); // Notify listing page
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price.toString());
    setImage(product.image);
    setDescription(product.description);
    setDecorType(product.decorType);
    setEditingId(product._id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
      if (editingId === id) clearForm();
      window.dispatchEvent(new Event('productsUpdated'));
      toast.success('Product deleted successfully');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="admin-panel-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Admin Panel</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Product Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price*"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
        />
        <select value={decorType} onChange={(e) => setDecorType(e.target.value)}>
          <option value="">Select Category*</option>
          <option value="Decor">Decor</option>
          <option value="Storage">Storage</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Furniture">Furniture</option>
        </select>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {image && <img src={image} alt="Preview" width="150" style={{ marginTop: '10px' }} />}

        <button onClick={handleAddOrUpdateProduct}>
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
        {editingId && <button onClick={clearForm} style={{ marginLeft: '10px' }}>Cancel</button>}
      </div>

      <hr />

      <h2>Product List</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price (₹)</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="5">No products available.</td>
            </tr>
          )}
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.decorType}</td>
              <td>{product.price}</td>
              <td>
                {product.image ? (
                  <img src={product.image} alt={product.name} width="50" />
                ) : (
                  'No Image'
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>{' '}
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
