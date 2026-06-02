import React from 'react';
import { Table, Button, Tag, Space } from 'antd';

const AdminApiKeys: React.FC = () => {
  const keys = [
    { id: 1001, name: 'AI创作月卡-默认Key', prefix: 'tk-abc123', balance: 58.35, status: 'active', user: '用户6688', createdAt: '2026-06-01' },
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 80 },
    { title: '名称', dataIndex: 'name' },
    { title: '前缀', dataIndex: 'prefix' },
    { title: '余额', dataIndex: 'balance', render: (v: number) => `¥${v}` },
    { title: '用户', dataIndex: 'user' },
    { title: '状态', dataIndex: 'status', render: () => <Tag color="green">正常</Tag> },
    { title: '创建时间', dataIndex: 'createdAt' },
    {
      title: '操作',
      render: () => (
        <Space>
          <Button size="small">详情</Button>
          <Button size="small" danger>停用</Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2>API Key 管理</h2>
      </div>
      <Table dataSource={keys} columns={columns} rowKey="id" />
    </div>
  );
};

export default AdminApiKeys;