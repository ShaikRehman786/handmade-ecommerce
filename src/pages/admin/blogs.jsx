// src/pages/blogs/List.jsx
import React, { useState } from 'react';
import { Table, Button, Input, Tag, Space } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [searchText, setSearchText] = useState('');

  const blogs = [
    {
      id: 1,
      title: '10 Tips for Handmade Product Care',
      author: 'Admin',
      date: '2023-05-01',
      status: 'published',
      views: 1245
    },
    {
      id: 2,
      title: 'The Art of Traditional Indian Craftsmanship',
      author: 'Admin',
      date: '2023-04-15',
      status: 'draft',
      views: 0
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Tag color={record.status === 'published' ? 'green' : 'orange'}>
          {record.status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Views',
      dataIndex: 'views',
      key: 'views',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/blogs/edit/${record.id}`}>
            <Button icon={<EditOutlined />} size="small" />
          </Link>
          <Button icon={<DeleteOutlined />} size="small" danger />
          {record.status === 'published' && (
            <Button icon={<EyeOutlined />} size="small" />
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="blog-list">
      <div className="page-header">
        <h1>Blog Management</h1>
        <Link to="/admin/blogs/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Blog Post
          </Button>
        </Link>
      </div>

      <div className="search-bar">
        <Input
          placeholder="Search blog posts..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      <Table 
        columns={columns} 
        dataSource={blogs} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default BlogList;