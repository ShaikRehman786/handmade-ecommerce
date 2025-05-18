// src/pages/banners/List.jsx
import React, { useState } from 'react';
import { Table, Button, Image, Tag, Space, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const BannerList = () => {
  const [banners, setBanners] = useState([
    {
      id: 1,
      image: '/banners/diwali-sale.jpg',
      title: 'Diwali Special Sale',
      position: 'Homepage Top',
      link: '/collections/diwali-special',
      isActive: true
    },
    {
      id: 2,
      image: '/banners/summer-collection.jpg',
      title: 'Summer Collection',
      position: 'Homepage Middle',
      link: '/collections/summer',
      isActive: false
    },
  ]);

  const handleStatusChange = (id, checked) => {
    setBanners(banners.map(banner => 
      banner.id === id ? { ...banner, isActive: checked } : banner
    ));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Banner',
      key: 'image',
      render: (_, record) => (
        <Image
          src={record.image}
          alt={record.title}
          width={150}
          preview={false}
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      render: (link) => <a href={link}>{link}</a>,
    },
    {
      title: 'Status',
      key: 'isActive',
      render: (_, record) => (
        <Switch
          checked={record.isActive}
          onChange={(checked) => handleStatusChange(record.id, checked)}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/banners/edit/${record.id}`}>
            <Button icon={<EditOutlined />} size="small" />
          </Link>
          <Button icon={<DeleteOutlined />} size="small" danger />
        </Space>
      ),
    },
  ];

  return (
    <div className="banner-list">
      <div className="page-header">
        <h1>Banner Management</h1>
        <Link to="/admin/banners/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Banner
          </Button>
        </Link>
      </div>

      <Table 
        columns={columns} 
        dataSource={banners} 
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default BannerList;