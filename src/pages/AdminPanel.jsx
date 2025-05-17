import React, { useState, useEffect } from 'react';
import '../pages/pages-css/AdminPanel.css';

const AdminPanel = () => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts
      ? JSON.parse(savedProducts)
      : [
          {
            _id: '1',
            name: 'Handmade Vase',
            price: 25,
            image: '',
            description: 'A beautiful handmade vase.',
            decorType: 'Vase',
          },
          {
            _id: '2',
            name: 'Wooden Chair',
            price: 150,
            image: '',
            description: 'Sturdy wooden chair for your home.',
            decorType: 'Furniture',
          },
          {
            _id: '3',
            name: 'Custom Painting',
            price: 100,
            image: '',
            description: 'Custom-made painting by local artist.',
            decorType: 'Painting',
          },
        ];
  });

  const [form, setForm] = useState({
    _id: null,
    name: '',
    price: '',
    image: '',
    description: '',
    decorType: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    window.dispatchEvent(new Event('productsUpdated'));
  }, [products]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (
      !form.name.trim() ||
      !form.price ||
      !form.image ||
      !form.description.trim() ||
      !form.decorType
    ) {
      alert('Please fill in all fields, upload an image, and select a decor type');
      return false;
    }
    if (isNaN(form.price) || parseFloat(form.price) <= 0) {
      alert('Please enter a valid price greater than 0');
      return false;
    }
    return true;
  };

  const handleAdd = () => {
    if (!validateForm()) return;

    const newProduct = {
      _id: products.length > 0 ? (parseInt(products[products.length - 1]._id) + 1).toString() : '1',
      name: form.name.trim(),
      price: parseFloat(form.price),
      image: form.image,
      description: form.description.trim(),
      decorType: form.decorType,
    };

    setProducts([...products, newProduct]);
    setForm({ _id: null, name: '', price: '', image: '', description: '', decorType: '' });
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setForm({ ...product });
  };

  const handleUpdate = () => {
    if (!validateForm()) return;

    setProducts(
      products.map((p) =>
        p._id === form._id
          ? {
              ...p,
              name: form.name.trim(),
              price: parseFloat(form.price),
              image: form.image,
              description: form.description.trim(),
              decorType: form.decorType,
            }
          : p
      )
    );
    setIsEditing(false);
    setForm({ _id: null, name: '', price: '', image: '', description: '', decorType: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setForm({ _id: null, name: '', price: '', image: '', description: '', decorType: '' });
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <div className="product-form">
        <h2>{isEditing ? 'Edit Product' : 'Add Product'}</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          min="0"
          step="0.01"
        />

        <select name="decorType" value={form.decorType} onChange={handleChange}>
          <option value="">Select Decor Type</option>
          <option value="Vase">Vase</option>
          <option value="Furniture">Furniture</option>
          <option value="Painting">Painting</option>
          <option value="Lighting">Lighting</option>
          <option value="Textile">Textile</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            style={{ width: '150px', marginTop: '10px', borderRadius: '4px' }}
          />
        )}

        {isEditing ? (
          <>
            <button onClick={handleUpdate}>Update Product</button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleAdd}>Add Product</button>
        )}
      </div>

      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Decor Type</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price.toFixed(2)}</td>
                <td>{product.decorType}</td>
                <td>{product.description}</td>
                <td>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '60px', borderRadius: '4px' }}
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;
