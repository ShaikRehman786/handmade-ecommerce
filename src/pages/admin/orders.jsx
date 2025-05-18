// src/pages/orders/List.jsx
import React, { useState } from 'react';
import { Table, Tag, Space, Input, Select, DatePicker } from 'antd';
import { SearchOutlined, FileTextOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Option } = Select;

const OrderList = () => {
  const [searchText, setSearchText] = useState('');
  const [, setStatusFilter] = useState('all');
  const [, setDateRange] = useState([]);

  const orders = [
    {
      id: 'ORD-1001',
      customer: 'Priya Sharma',
      date: '2023-05-15',
      amount: '₹1,299',
      status: 'shipped',
      items: 3
    },
    {
      id: 'ORD-1002',
      customer: 'Rahul Patel',
      date: '2023-05-14',
      amount: '₹899',
      status: 'processing',
      items: 2
    },
  ];

  const statusColors = {
    processing: 'blue',
    shipped: 'orange',
    delivered: 'green',
    cancelled: 'red'
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <Link to={`/admin/orders/${text}`}>{text}</Link>,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColors[status]}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Invoice',
      key: 'invoice',
      render: () => (
        <Button icon={<FileTextOutlined />} size="small">
          Download
        </Button>
      ),
    },
  ];

  return (
    <div className="order-list">
      <h1>Order Management</h1>
      
      <div className="filters">
        <Space size="large">
          <Input
            placeholder="Search orders..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
          
          <Select
            defaultValue="all"
            style={{ width: 150 }}
            onChange={setStatusFilter}
          >
            <Option value="all">All Status</Option>
            <Option value="processing">Processing</Option>
            <Option value="shipped">Shipped</Option>
            <Option value="delivered">Delivered</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
          
          <RangePicker 
            onChange={setDateRange}
            style={{ width: 250 }}
          />
        </Space>
      </div>

      <Table 
        columns={columns} 
        dataSource={orders} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default OrderList;