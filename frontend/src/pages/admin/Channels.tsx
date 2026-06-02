import React from 'react';
import { Table, Button, Tag, Space, Progress } from 'antd';

const AdminChannels: React.FC = () => {
  const channels = [
    { id: 1, name: '上海代理商A', code: 'SHA001', allocated: 50000, used: 15000, remaining: 35000, status: 'active' },
  ];

  const columns = [
    { title: '渠道名称', dataIndex: 'name' },
    { title: '编码', dataIndex: 'code' },
    { title: '分配额度', dataIndex: 'allocated', render: (v: number) => `¥${v}` },
    { title: '已用额度', dataIndex: 'used', render: (v: number) => `¥${v}` },
    { title: '剩余额度', dataIndex: 'remaining', render: (v: number) => `¥${v}` },
    {
      title: '使用率',
      render: (record: any) => (
        <Progress percent={Math.round((record.used / record.allocated) * 100)} size="small" />
      )
    },
    { title: '状态', dataIndex: 'status', render: () => <Tag color="green">正常</Tag> },
    {
      title: '操作',
      render: () => (
        <Space>
          <Button size="small">详情</Button>
          <Button size="small" type="primary">调整额度</Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2>渠道管理</h2>
      </div>
      <Table dataSource={channels} columns={columns} rowKey="id" />
    </div>
  );
};

export default AdminChannels;