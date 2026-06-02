import React, { useState } from 'react';
import { Card, Row, Col, Button, Tag, Badge, Tabs, Alert, Tooltip, Radio, Space, Statistic } from 'antd';
import { CheckCircleOutlined, FireOutlined, CrownOutlined, ThunderboltOutlined, RocketOutlined, ShoppingCartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { CREDIT_PACKAGES, MODEL_TIER_PACKAGES, ALL_MODELS } from '../data/modelPricing';
import type { PackageConfig } from '../data/modelPricing';

const { TabPane } = Tabs;

const PackageListPage: React.FC = () => {
  const [billingMode, setBillingMode] = useState<'credit' | 'tier'>('credit');
  const [selectedTier, setSelectedTier] = useState<string>('flash-tier');

  const handlePurchase = (pkg: PackageConfig) => {
    // 跳转支付页
    const orderUuid = 'ord_' + Math.random().toString(36).substr(2, 9);
    window.location.href = `/#/pay/${orderUuid}?pkg=${pkg.id}&amount=${pkg.price}&credit=${pkg.creditAmount + pkg.bonusCredit}`;
  };

  const handleTierPurchase = (tierId: string, pkgId: string, price: number, tokens: number) => {
    const orderUuid = 'ord_' + Math.random().toString(36).substr(2, 9);
    window.location.href = `/#/pay/${orderUuid}?tier=${tierId}&pkg=${pkgId}&amount=${price}&tokens=${tokens}`;
  };

  // 额度套餐渲染
  const renderCreditPackages = () => (
    <Row gutter={[24, 24]}>
      {CREDIT_PACKAGES.map((pkg, index) => {
        const icons = [ThunderboltOutlined, FireOutlined, RocketOutlined, CrownOutlined, RocketOutlined];
        const colors = ['#52c41a', '#1890ff', '#722ed1', '#fa8c16', '#f5222d'];
        const Icon = icons[index] || ShoppingCartOutlined;
        const color = colors[index] || '#1890ff';

        return (
          <Col xs={24} sm={12} lg={8} key={pkg.id}>
            <Card
              hoverable
              style={{
                borderRadius: 16,
                border: pkg.isPopular ? `2px solid ${color}` : '1px solid #f0f0f0',
                boxShadow: pkg.isPopular ? `0 8px 24px ${color}20` : '0 2px 8px rgba(0,0,0,0.06)',
                height: '100%',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {pkg.isPopular && (
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  background: color, color: '#fff',
                  padding: '4px 16px', borderRadius: '0 0 0 16px',
                  fontSize: 12, fontWeight: 'bold'
                }}>
                  最受欢迎
                </div>
              )}
              {pkg.isEnterprise && (
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  background: '#f5222d', color: '#fff',
                  padding: '4px 16px', borderRadius: '0 0 0 16px',
                  fontSize: 12, fontWeight: 'bold'
                }}>
                  企业级
                </div>
              )}

              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Icon style={{ fontSize: 48, color, marginBottom: 12 }} />
                <h3 style={{ margin: 0, fontSize: 22 }}>{pkg.name}</h3>
                <p style={{ color: '#888', marginTop: 8, fontSize: 13 }}>{pkg.description}</p>
              </div>

              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18, color: '#888' }}>¥</span>
                  <span style={{ fontSize: 42, fontWeight: 'bold', color }}>{pkg.price}</span>
                </div>
                <div style={{ marginTop: 4 }}>
                  <Tag color="success">获得 ¥{pkg.creditAmount + pkg.bonusCredit} 额度</Tag>
                  {pkg.bonusCredit > 0 && (
                    <Tag color="warning">+{pkg.bonusCredit} 赠送</Tag>
                  )}
                </div>
                <div style={{ marginTop: 8, color: '#888', fontSize: 12 }}>
                  相当于 {(pkg.price / (pkg.creditAmount + pkg.bonusCredit) * 100).toFixed(1)}% 折扣
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                {pkg.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 14 }}>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <Button
                type="primary"
                size="large"
                block
                style={{
                  borderRadius: 8,
                  height: 44,
                  background: color,
                  borderColor: color
                }}
                onClick={() => handlePurchase(pkg)}
              >
                立即购买
              </Button>
            </Card>
          </Col>
        );
      })}
    </Row>
  );

  // 模型分级套餐渲染
  const renderTierPackages = () => {
    const currentTier = MODEL_TIER_PACKAGES.find(t => t.id === selectedTier);
    if (!currentTier) return null;

    const tierColors: Record<string, string> = {
      'flash-tier': '#52c41a',
      'plus-tier': '#1890ff',
      'max-tier': '#f5222d',
    };
    const color = tierColors[selectedTier] || '#1890ff';

    // 该级别包含的模型
    const tierModels = ALL_MODELS.filter(m => currentTier.models.includes(m.id));

    return (
      <>
        <Alert
          message="模型分级套餐说明"
          description={
            <>
              <p>{currentTier.tierDescription}</p>
              <p>包含模型: {tierModels.map(m => <Tag key={m.id} color={color}>{m.name}</Tag>)}</p>
              <p>其他模型使用将按额度扣减</p>
            </>
          }
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />
        <Row gutter={[24, 24]}>
          {currentTier.packages.map((pkg, index) => {
            const icons = [ThunderboltOutlined, FireOutlined, RocketOutlined, CrownOutlined, RocketOutlined];
            const Icon = icons[index] || ShoppingCartOutlined;

            return (
              <Col xs={24} sm={12} lg={8} key={pkg.id}>
                <Card
                  hoverable
                  style={{
                    borderRadius: 16,
                    border: index === 2 ? `2px solid ${color}` : '1px solid #f0f0f0',
                    boxShadow: index === 2 ? `0 8px 24px ${color}20` : '0 2px 8px rgba(0,0,0,0.06)',
                    height: '100%'
                  }}
                >
                  <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Icon style={{ fontSize: 40, color, marginBottom: 12 }} />
                    <h3 style={{ margin: 0, fontSize: 20 }}>{pkg.name}</h3>
                  </div>

                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16, color: '#888' }}>¥</span>
                      <span style={{ fontSize: 36, fontWeight: 'bold', color }}>{pkg.price}</span>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <Tag color={color}>{(pkg.tokenAmount / 10000).toFixed(0)}万 Token</Tag>
                      <Tag>¥{pkg.unitPrice.toFixed(2)}/百万Token</Tag>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20, padding: '12px 0', borderTop: '1px dashed #eee', borderBottom: '1px dashed #eee' }}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Statistic title="输入Token" value={pkg.tokenAmount} suffix="个" valueStyle={{ fontSize: 14 }} />
                      </Col>
                      <Col span={12}>
                        <Statistic title="可用次数" value={(pkg.tokenAmount / 2000).toFixed(0)} suffix="次" valueStyle={{ fontSize: 14 }} />
                      </Col>
                    </Row>
                  </div>

                  <Button
                    type="primary"
                    size="large"
                    block
                    style={{
                      borderRadius: 8,
                      height: 44,
                      background: color,
                      borderColor: color
                    }}
                    onClick={() => handleTierPurchase(currentTier.id, pkg.id, pkg.price, pkg.tokenAmount)}
                  >
                    立即购买
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>
      </>
    );
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
      {/* 页面标题 */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 36, marginBottom: 16 }}>选择您的套餐</h1>
        <p style={{ fontSize: 16, color: '#666', maxWidth: 600, margin: '0 auto' }}>
          基于阿里云百炼真实定价，确保每一分钱都物有所值。
          <Tooltip title="我们直接对接阿里云百炼API，成本透明，定价合理，保证平台可持续运营">
            <InfoCircleOutlined style={{ marginLeft: 8, color: '#1890ff' }} />
          </Tooltip>
        </p>
      </div>

      {/* 计费模式切换 */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <Radio.Group
          value={billingMode}
          onChange={e => setBillingMode(e.target.value)}
          size="large"
          style={{ borderRadius: 8 }}
        >
          <Radio.Button value="credit">💰 额度充值 (推荐)</Radio.Button>
          <Radio.Button value="tier">🎯 模型分级套餐</Radio.Button>
        </Radio.Group>
      </div>

      {/* 额度充值模式 */}
      {billingMode === 'credit' && (
        <>
          <Alert
            message="额度充值说明"
            description={
              <>
                <p>1. 充值获得平台额度（1额度 = 1元人民币使用价值）</p>
                <p>2. 调用不同模型按实际消耗扣减额度（详见下方模型价格表）</p>
                <p>3. 额度永久有效，充值越多折扣越大</p>
                <p>4. 新用户注册即送免费额度，无需充值即可体验</p>
              </>
            }
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />
          {renderCreditPackages()}
        </>
      )}

      {/* 模型分级套餐 */}
      {billingMode === 'tier' && (
        <>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Space size="large">
              {MODEL_TIER_PACKAGES.map(tier => (
                <Badge key={tier.id} dot={tier.tier === 'flash'} color={tier.tier === 'flash' ? '#52c41a' : tier.tier === 'plus' ? '#1890ff' : '#f5222d'}>
                  <Button
                    type={selectedTier === tier.id ? 'primary' : 'default'}
                    size="large"
                    onClick={() => setSelectedTier(tier.id)}
                    style={{
                      borderRadius: 8,
                      minWidth: 140,
                      background: selectedTier === tier.id
                        ? (tier.tier === 'flash' ? '#52c41a' : tier.tier === 'plus' ? '#1890ff' : '#f5222d')
                        : undefined,
                      borderColor: selectedTier === tier.id
                        ? (tier.tier === 'flash' ? '#52c41a' : tier.tier === 'plus' ? '#1890ff' : '#f5222d')
                        : undefined,
                    }}
                  >
                    {tier.tierName}
                  </Button>
                </Badge>
              ))}
            </Space>
          </div>
          {renderTierPackages()}
        </>
      )}

      {/* 模型价格参考表 */}
      <Card title="模型价格参考表" style={{ marginTop: 48, borderRadius: 16 }}>
        <Alert
          message="价格说明"
          description="以下价格为调用API时的扣减单价。实际成本基于阿里云百炼官方定价 × 目前科技折扣(最低68折) × 平台运营系数。我们保持约50%毛利以确保平台可持续服务。"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Row gutter={[16, 16]}>
          {ALL_MODELS.filter(m => m.category === 'text').map(model => (
            <Col xs={24} sm={12} lg={8} key={model.id}>
              <Card
                size="small"
                title={
                  <Space>
                    <span>{model.name}</span>
                    {model.isRecommended && <Tag color="success">推荐</Tag>}
                    {model.isNew && <Tag color="blue">NEW</Tag>}
                  </Space>
                }
                extra={<Tag>{model.contextLength}</Tag>}
              >
                <p style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>{model.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>输入:</span>
                  <span style={{ fontWeight: 'bold', color: '#52c41a' }}>
                    ¥{(model.pricePer1KInput * 1000).toFixed(3)}/百万Token
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>输出:</span>
                  <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
                    ¥{(model.pricePer1KOutput * 1000).toFixed(3)}/百万Token
                  </span>
                </div>
                {model.freeQuota && model.freeQuota > 0 && (
                  <div style={{ marginTop: 8, textAlign: 'center' }}>
                    <Tag color="orange">新用户免费额度: {model.freeQuota >= 10000 ? (model.freeQuota / 10000).toFixed(0) + '万' : model.freeQuota} Token</Tag>
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default PackageListPage;
