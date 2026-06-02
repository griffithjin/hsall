import React from 'react';
import { Table, Button, Tag, Space } from 'antd';

const AdminOrders: React.FC = () => {
  const orders = [
    { id: 1, orderNo: 'ORD202606010001', user: '用户6688', package: 'AI创作月卡', amount: 59.9, status: 'completed', payStatus: 'paid', createdAt: '2026-06-01 14:32' },
    { id: 2, orderNo: 'ORD202606010002', user: '创作者小王', package: 'AI专业月卡', amount: 199, status: 'completed', payStatus: 'paid', createdAt: '2026-06-01 13:15' },
  ];

  const columns = [
    { title: '订单号', dataIndex: 'orderNo' },
    { title: '用户', dataIndex: 'user' },
    { title: '套餐', dataIndex: 'package' },
    { title: '金额', dataIndex: 'amount', render: (v: number) => `¥${v}` },
    { title: '支付状态', dataIndex: 'payStatus', render: () => <Tag color="green">已支付</Tag> },
    { title: '订单状态', dataIndex: 'status', render: () => <Tag color="blue">已完成</Tag> },
    { title: '创建时间', dataIndex: 'createdAt' },
    {
      title: '操作',
      render: () => (
        <Space>
          <Button size="small">详情</Button>
          <Button size="small" danger>退款</Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2>订单管理</h2>
      </div>
      <Table dataSource={orders} columns={columns} rowKey="id" />
    </div>
  );
};

export default AdminOrders;