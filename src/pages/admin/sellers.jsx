// src/pages/sellers/List.jsx
import React, { useState } from 'react';
import { Table, Button, Tag, Space, Input, Badge } from 'antd';
import { SearchOutlined, EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const SellerList = () => {
  const [searchText, setSearchText] = useState('');

  const sellers = [
    {
      id: 1,
      name: 'Artisan Crafts',
      email: 'contact@artisancrafts.com',
      phone: '+91 9876543210',
      products: 24,
      status: 'approved',
      verification: 'verified'
    },
    {
      id: 2,
      name: 'Handmade Treasures',
      email: 'info@handmadetreasures.in',
      phone: '+91 8765432109',
      products: 15,
      status: 'pending',
      verification: 'pending'
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
      title: 'Seller Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_, record) => (
        <div>
          <div>{record.email}</div>
          <div>{record.phone}</div>
        </div>
      ),
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
        <Tag color={record.status === 'approved' ? 'green' : 'orange'}>
          {record.status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Verification',
      key: 'verification',
      render: (_, record) => (
        <Badge 
          status={record.verification === 'verified' ? 'success' : 'warning'} 
          text={record.verification.toUpperCase()} 
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/sellers/${record.id}`}>
            <Button icon={<EyeOutlined />} size="small" />
          </Link>
          {record.status === 'pending' && (
            <>
              <Button icon={<CheckOutlined />} size="small" type="primary" />
              <Button icon={<CloseOutlined />} size="small" danger />
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="seller-list">
      <div className="page-header">
        <h1>Seller Management</h1>
        <Button type="primary">Add Seller</Button>
      </div>

      <div className="search-bar">
        <Input
          placeholder="Search sellers..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      <Table 
        columns={columns} 
        dataSource={sellers} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default SellerList;