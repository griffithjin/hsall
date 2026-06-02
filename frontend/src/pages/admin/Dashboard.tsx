import React from 'react';
import { Card, Statistic, Row, Col, Table, List } from 'antd';
import { UserOutlined, ShoppingOutlined, DollarOutlined, KeyOutlined, RiseOutlined } from '@ant-design/icons';

const AdminDashboard: React.FC = () => {
  const statCards = [
    { title: '总用户数', value: 10234, prefix: <UserOutlined />, color: '#1677ff' },
    { title: '今日订单', value: 156, prefix: <ShoppingOutlined />, color: '#52c41a' },
    { title: '今日收入', value: 8900, prefix: <DollarOutlined />, suffix: '元', color: '#faad14' },
    { title: '活跃Key', value: 3200, prefix: <KeyOutlined />, color: '#722ed1' },
  ];

  const recentOrders = [
    { id: 1, order_no: 'ORD202606010001', amount: 59.9, status: 'completed', time: '2026-06-01 14:32' },
    { id: 2, order_no: 'ORD202606010002', amount: 199, status: 'completed', time: '2026-06-01 13:15' },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {statCards.map(card => (
          <Col span={6} key={card.title}>
            <Card>
              <Statistic
                title={card.title}
                value={card.value}
                prefix={<span style={{ color: card.color }}>{card.prefix}</span>}
                suffix={card.suffix}
                valueStyle={{ color: card.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="收入趋势">
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8c8c8c' }}>
              [折线图占位 - 接入 Ant Design Charts]
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="最近订单">
            <Table
              dataSource={recentOrders}
              columns={[
                { title: '订单号', dataIndex: 'order_no' },
                { title: '金额', dataIndex: 'amount', render: v => `¥${v}` },
                { title: '状态', dataIndex: 'status', render: () => <span style={{ color: '#52c41a' }}>已完成</span> },
                { title: '时间', dataIndex: 'time' },
              ]}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
