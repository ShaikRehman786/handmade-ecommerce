// src/pages/reviews/List.jsx
import React, { useState } from 'react';
import { Table, Rate, Input, Button, Tag, Popconfirm } from 'antd';
import { SearchOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const ReviewList = () => {
  const [searchText, setSearchText] = useState('');

  const reviews = [
    {
      id: 1,
      product: 'Handmade Terracotta Pot',
      customer: 'Priya Sharma',
      rating: 5,
      comment: 'Beautiful craftsmanship! Exactly as shown in pictures.',
      date: '2023-05-10',
      status: 'approved'
    },
    {
      id: 2,
      product: 'Bamboo Basket Set',
      customer: 'Rahul Patel',
      rating: 4,
      comment: 'Good quality but delivery was delayed by 2 days.',
      date: '2023-05-08',
      status: 'pending'
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
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Rating',
      key: 'rating',
      render: (_, record) => <Rate disabled defaultValue={record.rating} />,
    },
    {
      title: 'Review',
      dataIndex: 'comment',
      key: 'comment',
      ellipsis: true,
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
        <Tag color={record.status === 'approved' ? 'green' : 'orange'}>
          {record.status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'pending' && (
            <>
              <Popconfirm
                title="Approve this review?"
                onConfirm={() => console.log('Approved', record.id)}
              >
                <Button icon={<CheckOutlined />} size="small" type="primary" />
              </Popconfirm>
              <Popconfirm
                title="Reject this review?"
                onConfirm={() => console.log('Rejected', record.id)}
              >
                <Button icon={<CloseOutlined />} size="small" danger />
              </Popconfirm>
            </>
          )}
          {record.status === 'approved' && (
            <Popconfirm
              title="Delete this review?"
              onConfirm={() => console.log('Deleted', record.id)}
            >
              <Button danger size="small">Delete</Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="review-list">
      <div className="page-header">
        <h1>Review Management</h1>
      </div>

      <div className="search-bar">
        <Input
          placeholder="Search reviews..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      <Table 
        columns={columns} 
        dataSource={reviews} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ReviewList;