import React from 'react';
import { Card, Table, Button, Tag, Space } from 'antd';

const UserApiKeys: React.FC = () => {
  const keys = [
    { id: 1, name: 'AI创作月卡-默认Key', prefix: 'tk-abc123', balance: 58.35, status: 'active', package: 'AI创作月卡', expiresAt: '2026-07-02' },
  ];

  const columns = [
    { title: '名称', dataIndex: 'name' },
    { title: '前缀', dataIndex: 'prefix' },
    { title: '余额', dataIndex: 'balance', render: (v: number) => `¥${v}` },
    { title: '套餐', dataIndex: 'package' },
    { title: '有效期至', dataIndex: 'expiresAt' },
    { title: '状态', dataIndex: 'status', render: () => <Tag color="green">正常</Tag> },
    {
      title: '操作',
      render: () => (
        <Space>
          <Button size="small">复制Key</Button>
          <Button size="small" type="primary">续费</Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <h2>我的API Keys</h2>
      <Table dataSource={keys} columns={columns} rowKey="id" />
    </div>
  );
};

export default UserApiKeys;