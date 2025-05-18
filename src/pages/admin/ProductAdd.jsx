// src/pages/products/AddEdit.jsx
import React, { useState } from 'react';
import { Form, Input, Button, Select, Upload, InputNumber, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

const ProductAdd = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const categories = [
    'Jewelry',
    'Handicraft',
    'Clothing',
    'Home Decor',
    'Festive',
    'Kitchenware',
    'Artwork'
  ];

  const onFinish = (values) => {
    console.log('Success:', values);
    message.success('Product added successfully!');
    navigate('/admin/products');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    multiple: true,
    accept: 'image/*',
  };

  return (
    <div className="product-form">
      <h1>Add New Product</h1>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Please input product name!' }]}
        >
          <Input placeholder="e.g. Handmade Terracotta Pot" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input product description!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please select category!' }]}
        >
          <Select placeholder="Select a category">
            {categories.map(cat => (
              <Option key={cat} value={cat}>{cat}</Option>
            ))}
          </Select>
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Price (₹)"
              name="price"
              rules={[{ required: true, message: 'Please input price!' }]}
            >
              <InputNumber 
                min={0} 
                style={{ width: '100%' }} 
                formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Discount (%)"
              name="discount"
            >
              <InputNumber 
                min={0} 
                max={100} 
                style={{ width: '100%' }} 
                formatter={value => `${value}%`}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Stock Quantity"
          name="stock"
          rules={[{ required: true, message: 'Please input stock quantity!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Product Images"
          name="images"
          rules={[{ required: true, message: 'Please upload at least one image!' }]}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;