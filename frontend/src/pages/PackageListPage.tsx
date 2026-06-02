import React from 'react';
import { Card, List, Button, Typography, Tag } from 'antd';

const { Title, Text } = Typography;

const PackageListPage: React.FC = () => {
  const packages = [
    { id: 1, name: 'AI体验卡', price: 19.9, tag: '新人首选', features: ['5亿Token', '10分钟视频', '20张图片'] },
    { id: 2, name: 'AI创作月卡', price: 59.9, originalPrice: 99.9, tag: '热销', features: ['30亿Token', '60分钟视频', '200张图片'] },
    { id: 3, name: 'AI专业月卡', price: 199, tag: '专业之选', features: ['150亿Token', '300分钟视频', '800张图片'] },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>选择适合您的套餐</Title>
      
      <List
        grid={{ gutter: 24, xs: 1, sm: 2, md: 3 }}
        dataSource={packages}
        renderItem={pkg => (
          <List.Item>
            <Card
              hoverable
              title={pkg.name}
              extra={<Tag color="blue">{pkg.tag}</Tag>}
              actions={[<Button type="primary" block>立即购买</Button>]}
            >
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#1677ff' }}>¥{pkg.price}</Text>
                {pkg.originalPrice && <Text delete style={{ marginLeft: 8 }}>¥{pkg.originalPrice}</Text>}
              </div>
              
              <div>
                {pkg.features.map((f, i) => (
                  <div key={i} style={{ margin: '8px 0' }}>✅ {f}</div>
                ))}
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PackageListPage;