import React from 'react';
import { Card, Statistic, Row, Col, Button, List, Typography } from 'antd';
import { WalletOutlined, ThunderboltOutlined, KeyOutlined, ShoppingOutlined } from '@ant-design/icons';

const { Title } = Typography;

const UserDashboard: React.FC = () => {
  return (
    <div>
      <Title level={3}>概览</Title>
      
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="总余额"
              value={58.35}
              precision={2}
              prefix={<WalletOutlined />}
              suffix="元"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="今日用量"
              value={2.15}
              precision={2}
              prefix={<ThunderboltOutlined />}
              suffix="元"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="活跃Key"
              value={2}
              prefix={<KeyOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="我的API Keys" extra={<Button type="primary">查看全部</Button>}>
        <List>
          <List.Item
            actions={[
              <Button type="primary">续费</Button>,
              <Button>详情</Button>
            ]}
          >
            <List.Item.Meta
              title="AI创作月卡"
              description={
                <div>
                  <p>余额: ¥58.35 | 有效期至: 2026-07-02</p>
                  <p>通义千问3.7: 50/300亿 | 万相视频: 5/60分钟</p>
                </div>
              }
            />
          </List.Item>
        </List>
      </Card>
    </div>
  );
};

export default UserDashboard;
