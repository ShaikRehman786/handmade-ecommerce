// src/pages/customers/List.jsx
import React, { useState } from 'react';
import { Table, Tag, Input, Button, Badge } from 'antd';
import { SearchOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const [searchText, setSearchText] = useState('');

  const customers = [
    {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 9876543210',
      orders: 5,
      status: 'active',
      joined: '2023-01-15'
    },
    {
      id: 2,
      name: 'Rahul Patel',
      email: 'rahul.patel@example.com',
      phone: '+91 8765432109',
      orders: 2,
      status: 'active',
      joined: '2023-03-22'
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
      title: 'Customer',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="customer-cell">
          <div className="avatar">
            <UserOutlined />
          </div>
          <div>
            <div>{text}</div>
            <div className="contact-info">
              <span><MailOutlined /> {record.email}</span>
              <span><PhoneOutlined /> {record.phone}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Orders',
      dataIndex: 'orders',
      key: 'orders',
    },
    {
      title: 'Joined On',
      dataIndex: 'joined',
      key: 'joined',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Badge 
          status={record.status === 'active' ? 'success' : 'error'} 
          text={record.status.toUpperCase()} 
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/customers/${record.id}`}>
            <Button size="small">View</Button>
          </Link>
          <Button 
            size="small" 
            danger={record.status === 'active'}
          >
            {record.status === 'active' ? 'Ban' : 'Unban'}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="customer-list">
      <div className="page-header">
        <h1>Customer Management</h1>
      </div>

      <div className="search-bar">
        <Input
          placeholder="Search customers..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      <Table 
        columns={columns} 
        dataSource={customers} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default CustomerList;