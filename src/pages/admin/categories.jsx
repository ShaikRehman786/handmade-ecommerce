// src/pages/categories/List.jsx
import React, { useState } from 'react';
import { Table, Button, Input, Tag, Popconfirm, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CategoryList = () => {
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([
    { id: 1, name: 'Jewelry', slug: 'jewelry', products: 124, status: 'active' },
    { id: 2, name: 'Handicraft', slug: 'handicraft', products: 89, status: 'active' },
    { id: 3, name: 'Clothing', slug: 'clothing', products: 76, status: 'active' },
  ]);

  const handleDelete = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
    message.success('Category deleted successfully!');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Tag color={record.status === 'active' ? 'green' : 'red'}>
          {record.status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} size="small" />
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="category-list">
      <div className="page-header">
        <h1>Category Management</h1>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Category
        </Button>
      </div>

      <div className="search-bar">
        <Input
          placeholder="Search categories..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      <Table 
        columns={columns} 
        dataSource={categories} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default CategoryList;