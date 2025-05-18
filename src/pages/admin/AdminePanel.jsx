// src/pages/Dashboard.jsx
import React from 'react';
import { Card, Row, Col, Table, Alert } from 'antd';
import { ShoppingCartOutlined, DollarOutlined, UserAddOutlined, ShopOutlined } from '@ant-design/icons';

const Dashboard = () => {
  // Sample data
  const stats = [
    { title: 'Total Orders', value: '1,245', icon: <ShoppingCartOutlined />, change: '+12%' },
    { title: 'Revenue', value: '₹2,45,678', icon: <DollarOutlined />, change: '+8%' },
    { title: 'New Users', value: '342', icon: <UserAddOutlined />, change: '+5%' },
    { title: 'Active Sellers', value: '156', icon: <ShopOutlined />, change: '+3%' }
  ];

  const recentOrders = [
    { id: '#ORD-1001', customer: 'Priya Sharma', amount: '₹1,299', status: 'Shipped', date: '2023-05-15' },
    { id: '#ORD-1002', customer: 'Rahul Patel', amount: '₹899', status: 'Processing', date: '2023-05-14' },
    { id: '#ORD-1003', customer: 'Neha Gupta', amount: '₹2,450', status: 'Delivered', date: '2023-05-13' },
  ];

  const columns = [
    { title: 'Order ID', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>
      
      <Row gutter={16} className="stats-row">
        {stats.map((stat, index) => (
          <Col span={6} key={index}>
            <Card>
              <div className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <h3>{stat.title}</h3>
                  <p className="stat-value">{stat.value}</p>
                  <p className="stat-change">{stat.change}</p>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16} className="alerts-row">
        <Col span={24}>
          <Alert 
            message="Inventory Alert: 5 products are low in stock" 
            type="warning" 
            showIcon 
            action={<a href="/admin/products">View Products</a>}
          />
          <Alert 
            message="12 seller verifications pending approval" 
            type="info" 
            showIcon 
            action={<a href="/admin/sellers">Review Sellers</a>}
          />
        </Col>
      </Row>

      <Card title="Recent Orders" className="recent-orders">
        <Table 
          dataSource={recentOrders} 
          columns={columns} 
          pagination={false} 
          size="small" 
        />
      </Card>
    </div>
  );
};

export default Dashboard;