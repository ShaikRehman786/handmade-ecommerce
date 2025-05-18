// src/pages/products/List.jsx
import React, { useState } from 'react';
import { Table, Button, Space, Input, Tag } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [searchText, setSearchText] = useState('');
  
  const products = [
    { 
      id: 1, 
      name: 'Handmade Terracotta Pot', 
      category: 'Home Decor', 
      price: '₹899', 
      stock: 15,
      status: 'active',
      images: ['pot1.jpg']
    },
    { 
      id: 2, 
      name: 'Bamboo Basket Set', 
      category: 'Storage', 
      price: '₹1,299', 
      stock: 8,
      status: 'active',
      images: ['basket1.jpg', 'basket2.jpg']
    },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="product-cell">
          <img 
            src={`/uploads/${record.images[0]}`} 
            alt={text} 
            className="product-thumbnail"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock) => (
        <Tag color={stock < 10 ? 'red' : 'green'}>{stock}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/products/edit/${record.id}`}>
            <Button icon={<EditOutlined />} size="small" />
          </Link>
          <Button 
            icon={<DeleteOutlined />} 
            size="small" 
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="product-list">
      <div className="page-header">
        <h1>Product Management</h1>
        <Link to="/admin/products/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Product
          </Button>
        </Link>
      </div>

      <div className="search-bar">
        <Input
          placeholder="Search products..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      <Table 
        columns={columns} 
        dataSource={products} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ProductList;