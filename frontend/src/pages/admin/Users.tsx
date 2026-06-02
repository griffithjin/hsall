import React from 'react';
import { Table, Button, Tag, Space, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const AdminUsers: React.FC = () => {
  const users = [
    { id: 10001, nickname: '用户6688', phone: '138****6688', role: 'consumer', status: 'active', createdAt: '2026-06-01' },
    { id: 10002, nickname: '创作者小王', phone: '139****1234', role: 'consumer', status: 'active', createdAt: '2026-06-01' },
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 80 },
    { title: '昵称', dataIndex: 'nickname' },
    { title: '手机号', dataIndex: 'phone' },
    { title: '角色', dataIndex: 'role', render: () => <Tag>消费者</Tag> },
    { title: '状态', dataIndex: 'status', render: () => <Tag color="green">正常</Tag> },
    { title: '注册时间', dataIndex: 'createdAt' },
    {
      title: '操作',
      render: () => (
        <Space>
          <Button size="small">详情</Button>
          <Button size="small" danger>禁用</Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <h2>用户管理</h2>
        <Space>
          <Input placeholder="搜索用户" prefix={<SearchOutlined />} style={{ width: 240 }} />
          <Select placeholder="状态" style={{ width: 120 }} options={[
            { value: 'all', label: '全部' },
            { value: 'active', label: '正常' },
            { value: 'inactive', label: '禁用' }
          ]} />
        </Space>
      </div>

      <Table dataSource={users} columns={columns} rowKey="id" />
    </div>
  );
};

export default AdminUsers;