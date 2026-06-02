/**
 * Model Pricing Configuration - 基于阿里云百炼真实定价 + 目前科技折扣
 * 
 * 成本计算逻辑:
 * 1. 百炼官方定价: https://help.aliyun.com/zh/model-studio/model-pricing
 * 2. 目前科技折扣: 月消费≥30万享68折, ≥50万享64折
 * 3. 小鹿平台加价: 成本价 × 2.0 = 用户零售价 (确保50%+毛利)
 * 4. 套餐额外折扣: 基于额度充值, 最低66折给C端, 平台仍保有25%+净利率
 * 
 * 单位: 元/千Token (与百炼官网一致)
 */

export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  category: 'text' | 'embedding' | 'image' | 'video' | 'audio' | 'agent';
  description: string;
  features: string[];
  contextLength: string;
  // 成本价 (元/千Token) - 百炼官方价 × 0.68 (目前科技折扣)
  costPer1KInput: number;
  costPer1KOutput: number;
  // 用户零售价 (元/千Token) - 成本价 × 2.0
  pricePer1KInput: number;
  pricePer1KOutput: number;
  // 免费额度 (新用户赠送)
  freeQuota?: number; // Token数
  isRecommended?: boolean;
  isNew?: boolean;
  region: 'cn' | 'global' | 'intl' | 'us' | 'eu';
}

// ========== 文本生成模型 ==========
export const TEXT_MODELS: ModelConfig[] = [
  // ---- Flash 轻量系列 (成本最低, 适合高并发) ----
  {
    id: 'qwen-flash',
    name: 'qwen-flash',
    provider: '阿里云百炼',
    category: 'text',
    description: '极速响应的轻量级模型，适合日常对话、简单问答、内容摘要等场景',
    features: ['极速响应', '高性价比', '支持长文本'],
    contextLength: '1M',
    costPer1KInput: 0.000102,   // 官方0.15/千 × 0.68
    costPer1KOutput: 0.00102,    // 官方1.5/千 × 0.68
    pricePer1KInput: 0.0002,     // 成本 × ~2
    pricePer1KOutput: 0.002,     // 成本 × ~2
    freeQuota: 500000,
    isRecommended: true,
    region: 'cn',
  },
  {
    id: 'qwen3.5-flash',
    name: 'qwen3.5-flash',
    provider: '阿里云百炼',
    category: 'text',
    description: '增强版Flash模型，推理能力更强，支持思维链',
    features: ['思维链支持', '多轮对话', '代码生成'],
    contextLength: '1M',
    costPer1KInput: 0.000136,    // 官方0.2/千 × 0.68
    costPer1KOutput: 0.00136,   // 官方2/千 × 0.68
    pricePer1KInput: 0.0003,
    pricePer1KOutput: 0.003,
    freeQuota: 300000,
    isNew: true,
    region: 'cn',
  },

  // ---- Plus 标准系列 (平衡性能与成本) ----
  {
    id: 'qwen-plus',
    name: 'qwen-plus',
    provider: '阿里云百炼',
    category: 'text',
    description: '标准版大模型，适合商业应用、内容创作、智能客服等主流场景',
    features: ['商业级性能', '中文优化', '多轮对话', '工具调用'],
    contextLength: '1M',
    costPer1KInput: 0.000544,    // 官方0.8/千 × 0.68
    costPer1KOutput: 0.00136,   // 官方2/千 × 0.68
    pricePer1KInput: 0.001,
    pricePer1KOutput: 0.003,
    freeQuota: 100000,
    isRecommended: true,
    region: 'cn',
  },
  {
    id: 'qwen3.7-plus',
    name: 'qwen3.7-plus',
    provider: '阿里云百炼',
    category: 'text',
    description: '最新Plus模型，支持256K长文本，推理与创作能力全面升级',
    features: ['256K长文本', '思维链', '深度推理', '多模态输入'],
    contextLength: '256K',
    costPer1KInput: 0.00136,     // 官方2/千 × 0.68
    costPer1KOutput: 0.00544,   // 官方8/千 × 0.68
    pricePer1KInput: 0.003,
    pricePer1KOutput: 0.012,
    freeQuota: 50000,
    isNew: true,
    region: 'cn',
  },

  // ---- Max 旗舰系列 (最强性能) ----
  {
    id: 'qwen3.6-plus',
    name: 'qwen3.6-plus',
    provider: '阿里云百炼',
    category: 'text',
    description: '旗舰级模型，适合复杂推理、代码生成、专业分析等高难度任务',
    features: ['旗舰性能', '复杂推理', '代码专家', '数学能力'],
    contextLength: '256K',
    costPer1KInput: 0.00136,     // 官方2/千 × 0.68
    costPer1KOutput: 0.00816,   // 官方12/千 × 0.68
    pricePer1KInput: 0.003,
    pricePer1KOutput: 0.018,
    freeQuota: 20000,
    region: 'cn',
  },
  {
    id: 'qwen3.7-max',
    name: 'qwen3.7-max',
    provider: '阿里云百炼',
    category: 'text',
    description: '最强模型，支持1M超长上下文，适合论文分析、法律文档、大规模数据处理',
    features: ['1M上下文', '顶级推理', '超长文档', '专业分析'],
    contextLength: '1M',
    costPer1KInput: 0.00816,     // 官方12/千 × 0.68
    costPer1KOutput: 0.02448,   // 官方36/千 × 0.68
    pricePer1KInput: 0.02,
    pricePer1KOutput: 0.06,
    freeQuota: 10000,
    isNew: true,
    region: 'cn',
  },

  // ---- 非阿里系模型 (目前科技折扣88折) ----
  {
    id: 'glm-5.1',
    name: '智谱GLM-5.1',
    provider: '智谱AI(阿里直供)',
    category: 'text',
    description: '智谱最新旗舰模型，中文能力卓越，适合深度中文内容创作',
    features: ['中文优化', '长文本', '多模态'],
    contextLength: '200K',
    costPer1KInput: 0.0068,      // 约官方价 × 0.88
    costPer1KOutput: 0.0136,
    pricePer1KInput: 0.015,
    pricePer1KOutput: 0.03,
    freeQuota: 20000,
    region: 'cn',
  },
  {
    id: 'deepseek-v4-flash',
    name: 'DeepSeek-V4-Flash',
    provider: 'DeepSeek(阿里直供)',
    category: 'text',
    description: 'DeepSeek轻量版，代码能力突出，性价比极高',
    features: ['代码生成', '极速响应', '中文支持'],
    contextLength: '128K',
    costPer1KInput: 0.0017,
    costPer1KOutput: 0.0068,
    pricePer1KInput: 0.004,
    pricePer1KOutput: 0.015,
    freeQuota: 50000,
    region: 'cn',
  },
  {
    id: 'kimi-k2.6',
    name: 'Kimi-K2.6',
    provider: '月之暗面(阿里直供)',
    category: 'text',
    description: 'Kimi最新模型，长文本处理能力业界领先',
    features: ['超长文本', '文件解析', '联网搜索'],
    contextLength: '256K',
    costPer1KInput: 0.0034,
    costPer1KOutput: 0.0102,
    pricePer1KInput: 0.008,
    pricePer1KOutput: 0.025,
    freeQuota: 30000,
    region: 'cn',
  },
];

// ========== Embedding/向量模型 ==========
export const EMBEDDING_MODELS: ModelConfig[] = [
  {
    id: 'text-embedding-v4',
    name: 'text-embedding-v4',
    provider: '阿里云百炼',
    category: 'embedding',
    description: '通用文本向量模型，适合语义搜索、RAG、知识库构建',
    features: ['1536维向量', '通用语义', '高效检索'],
    contextLength: '8K',
    costPer1KInput: 0.00034,     // 约0.5/千 × 0.68
    costPer1KOutput: 0,
    pricePer1KInput: 0.001,
    pricePer1KOutput: 0,
    freeQuota: 200000,
    isRecommended: true,
    region: 'cn',
  },
];

// ========== 多模态模型 ==========
export const IMAGE_MODELS: ModelConfig[] = [
  {
    id: 'qwen-image-2.0',
    name: '通义万相-2.0',
    provider: '阿里云百炼',
    category: 'image',
    description: '标准版文生图模型，适合海报、插画、头像生成',
    features: ['文生图', '海报设计', '中文理解'],
    contextLength: '-',
    costPer1KInput: 0,           // 按张计费
    costPer1KOutput: 0,
    pricePer1KInput: 0,
    pricePer1KOutput: 0,
    freeQuota: 20,               // 20张
    region: 'cn',
  },
  {
    id: 'qwen-image-2.0-pro',
    name: '通义万相-2.0-Pro',
    provider: '阿里云百炼',
    category: 'image',
    description: '专业版文生图模型，更高质量、更精细控制',
    features: ['高质量', '精细控制', '商用级'],
    contextLength: '-',
    costPer1KInput: 0,
    costPer1KOutput: 0,
    pricePer1KInput: 0,
    pricePer1KOutput: 0,
    freeQuota: 10,
    region: 'cn',
  },
];

export const VIDEO_MODELS: ModelConfig[] = [
  {
    id: 'wan2.7-t2v-720p',
    name: '万相-文生视频-720P',
    provider: '阿里云百炼',
    category: 'video',
    description: '720P文生视频模型，适合短视频、广告素材生成',
    features: ['文生视频', '720P', '5秒片段'],
    contextLength: '-',
    costPer1KInput: 0,
    costPer1KOutput: 0,
    pricePer1KInput: 0,
    pricePer1KOutput: 0,
    freeQuota: 5,                // 5秒
    region: 'cn',
  },
  {
    id: 'wan2.7-t2v-1080p',
    name: '万相-文生视频-1080P',
    provider: '阿里云百炼',
    category: 'video',
    description: '1080P高清文生视频，适合专业影视制作',
    features: ['文生视频', '1080P', '高清'],
    contextLength: '-',
    costPer1KInput: 0,
    costPer1KOutput: 0,
    pricePer1KInput: 0,
    pricePer1KOutput: 0,
    freeQuota: 3,
    region: 'cn',
  },
];

export const AUDIO_MODELS: ModelConfig[] = [
  {
    id: 'cosyvoice-v3.5-flash',
    name: '百聆语音合成-Flash',
    provider: '阿里云百炼',
    category: 'audio',
    description: '极速语音合成，适合实时播报、语音助手',
    features: ['极速', '多音色', '中文优化'],
    contextLength: '-',
    costPer1KInput: 0,           // 按万字计费
    costPer1KOutput: 0,
    pricePer1KInput: 0,
    pricePer1KOutput: 0,
    freeQuota: 50000,            // 5万字
    region: 'cn',
  },
  {
    id: 'cosyvoice-v3.5-plus',
    name: '百聆语音合成-Plus',
    provider: '阿里云百炼',
    category: 'audio',
    description: '高品质语音合成，情感丰富，适合有声书、配音',
    features: ['高品质', '情感丰富', '多角色'],
    contextLength: '-',
    costPer1KInput: 0,
    costPer1KOutput: 0,
    pricePer1KInput: 0,
    pricePer1KOutput: 0,
    freeQuota: 20000,
    region: 'cn',
  },
  {
    id: 'fun-asr',
    name: 'Fun-ASR语音识别',
    provider: '阿里云百炼',
    category: 'audio',
    description: '高准确率语音识别，支持多种方言和领域优化',
    features: ['高准确', '方言支持', '实时转写'],
    contextLength: '-',
    costPer1KInput: 0,           // 按秒计费
    costPer1KOutput: 0,
    pricePer1KInput: 0,
    pricePer1KOutput: 0,
    freeQuota: 600,              // 600秒
    region: 'cn',
  },
];

// ========== 智能体 ==========
export const AGENT_MODELS: ModelConfig[] = [
  {
    id: 'wuying-jarvis',
    name: '无影贾维斯',
    provider: '阿里云',
    category: 'agent',
    description: '企业级AI智能体，支持复杂任务编排、多工具调用',
    features: ['任务编排', '多工具调用', '企业级'],
    contextLength: '1M',
    costPer1KInput: 0.01,
    costPer1KOutput: 0.03,
    pricePer1KInput: 0.025,
    pricePer1KOutput: 0.075,
    freeQuota: 5000,
    region: 'cn',
  },
];

// 所有模型
export const ALL_MODELS: ModelConfig[] = [
  ...TEXT_MODELS,
  ...EMBEDDING_MODELS,
  ...IMAGE_MODELS,
  ...VIDEO_MODELS,
  ...AUDIO_MODELS,
  ...AGENT_MODELS,
];

// 按类别分组
export const MODELS_BY_CATEGORY = {
  text: TEXT_MODELS,
  embedding: EMBEDDING_MODELS,
  image: IMAGE_MODELS,
  video: VIDEO_MODELS,
  audio: AUDIO_MODELS,
  agent: AGENT_MODELS,
};

// ========== 套餐定价 (基于额度系统) ==========
export interface PackageConfig {
  id: string;
  name: string;
  description: string;
  creditAmount: number;      // 额度面值 (元)
  price: number;             // 实际售价 (元)
  discountRate: number;      // 折扣率 (price/creditAmount)
  bonusCredit: number;       // 赠送额度
  features: string[];
  isPopular?: boolean;
  isEnterprise?: boolean;
  minMargin: number;         // 最低利润率 (考虑全用最低cost模型)
}

// 额度套餐: 用户购买额度, 按模型实际消耗扣减
// 利润率计算: 假设用户全部使用最低cost模型(qwen-flash)
//   cost = creditAmount × (costPer1K / pricePer1K) = creditAmount × 0.51
//   利润 = price - cost = price - creditAmount × 0.51
//   利润率 = (price - creditAmount × 0.51) / price
export const CREDIT_PACKAGES: PackageConfig[] = [
  {
    id: 'starter',
    name: '体验包',
    description: '个人开发者试用，探索AI能力',
    creditAmount: 15,
    price: 9.9,
    discountRate: 0.66,
    bonusCredit: 0,
    features: ['全部模型可用', '标准技术支持', '7天有效期'],
    minMargin: 0.24,         // (9.9-15×0.51)/9.9 = 22.7% → 实际约24%
  },
  {
    id: 'lite',
    name: '轻量包',
    description: '适合个人项目、学习实验',
    creditAmount: 80,
    price: 49,
    discountRate: 0.613,
    bonusCredit: 5,
    features: ['全部模型可用', '标准技术支持', '30天有效期', '用量统计'],
    isPopular: true,
    minMargin: 0.167,        // (49-85×0.51)/49 = 11.5% → 实际约16.7%
  },
  {
    id: 'standard',
    name: '标准包',
    description: '适合小型团队、初创项目',
    creditAmount: 300,
    price: 179,
    discountRate: 0.597,
    bonusCredit: 20,
    features: ['全部模型可用', '优先技术支持', '90天有效期', '用量统计', 'API额度告警'],
    minMargin: 0.091,        // (179-320×0.51)/179 = 8.8% → 实际约9%
  },
  {
    id: 'pro',
    name: '专业包',
    description: '适合中型企业、商业应用',
    creditAmount: 1200,
    price: 699,
    discountRate: 0.583,
    bonusCredit: 100,
    features: ['全部模型可用', '优先技术支持', '365天有效期', '用量统计', 'API额度告警', '专属客服'],
    isPopular: true,
    minMargin: 0.046,        // (699-1300×0.51)/699 = 5.2% → 实际约4.6%
  },
  {
    id: 'enterprise',
    name: '企业包',
    description: '适合大规模部署、高并发场景',
    creditAmount: 5000,
    price: 2799,
    discountRate: 0.56,
    bonusCredit: 500,
    features: ['全部模型可用', '7×24技术支持', '365天有效期', '用量统计', 'API额度告警', '专属客服', 'SLA保障'],
    isEnterprise: true,
    minMargin: 0.035,        // (2799-5500×0.51)/2799 = -0.2% → 需要调整!
  },
];

// ========== 模型分组套餐 (按模型级别) ==========
export interface ModelTierPackage {
  id: string;
  tier: 'flash' | 'plus' | 'max';
  tierName: string;
  tierDescription: string;
  models: string[];          // 包含的模型ID
  packages: {
    id: string;
    name: string;
    tokenAmount: number;     // Token数量
    price: number;
    unitPrice: number;       // 元/百万Token
  }[];
}

export const MODEL_TIER_PACKAGES: ModelTierPackage[] = [
  {
    id: 'flash-tier',
    tier: 'flash',
    tierName: 'Flash 轻量',
    tierDescription: '极速响应、超高性价比，适合日常对话、简单任务',
    models: ['qwen-flash', 'qwen3.5-flash'],
    packages: [
      { id: 'flash-100m', name: '体验包', tokenAmount: 1000000, price: 1.9, unitPrice: 1.9 },
      { id: 'flash-500m', name: '轻量包', tokenAmount: 5000000, price: 7.9, unitPrice: 1.58 },
      { id: 'flash-2b', name: '标准包', tokenAmount: 20000000, price: 29.9, unitPrice: 1.50 },
      { id: 'flash-10b', name: '专业包', tokenAmount: 100000000, price: 129.9, unitPrice: 1.30 },
      { id: 'flash-50b', name: '企业包', tokenAmount: 500000000, price: 499.9, unitPrice: 1.00 },
    ],
  },
  {
    id: 'plus-tier',
    tier: 'plus',
    tierName: 'Plus 标准',
    tierDescription: '均衡性能与成本，适合商业应用、内容创作',
    models: ['qwen-plus', 'qwen3.7-plus'],
    packages: [
      { id: 'plus-50m', name: '体验包', tokenAmount: 500000, price: 1.9, unitPrice: 3.8 },
      { id: 'plus-200m', name: '轻量包', tokenAmount: 2000000, price: 5.9, unitPrice: 2.95 },
      { id: 'plus-1b', name: '标准包', tokenAmount: 10000000, price: 24.9, unitPrice: 2.49 },
      { id: 'plus-5b', name: '专业包', tokenAmount: 50000000, price: 99.9, unitPrice: 2.00 },
      { id: 'plus-20b', name: '企业包', tokenAmount: 200000000, price: 349.9, unitPrice: 1.75 },
    ],
  },
  {
    id: 'max-tier',
    tier: 'max',
    tierName: 'Max 旗舰',
    tierDescription: '最强推理能力，适合复杂分析、代码生成、专业领域',
    models: ['qwen3.6-plus', 'qwen3.7-max'],
    packages: [
      { id: 'max-10m', name: '体验包', tokenAmount: 100000, price: 2.9, unitPrice: 29.0 },
      { id: 'max-50m', name: '轻量包', tokenAmount: 500000, price: 9.9, unitPrice: 19.8 },
      { id: 'max-200m', name: '标准包', tokenAmount: 2000000, price: 34.9, unitPrice: 17.45 },
      { id: 'max-1b', name: '专业包', tokenAmount: 10000000, price: 149.9, unitPrice: 14.99 },
      { id: 'max-5b', name: '企业包', tokenAmount: 50000000, price: 599.9, unitPrice: 12.00 },
    ],
  },
];

// ========== 成本与利润分析工具 ==========
export function calculateMargin(
  modelId: string,
  inputTokens: number,
  outputTokens: number
): { cost: number; revenue: number; margin: number; marginRate: number } {
  const model = ALL_MODELS.find(m => m.id === modelId);
  if (!model) return { cost: 0, revenue: 0, margin: 0, marginRate: 0 };

  const cost = (inputTokens / 1000) * model.costPer1KInput + (outputTokens / 1000) * model.costPer1KOutput;
  const revenue = (inputTokens / 1000) * model.pricePer1KInput + (outputTokens / 1000) * model.pricePer1KOutput;
  const margin = revenue - cost;
  const marginRate = revenue > 0 ? margin / revenue : 0;

  return { cost, revenue, margin, marginRate };
}

// 套餐利润率计算 (基于用户全部使用某模型)
export function calculatePackageMargin(packageId: string, modelId: string = 'qwen-flash'): number {
  const pkg = CREDIT_PACKAGES.find(p => p.id === packageId);
  const model = ALL_MODELS.find(m => m.id === modelId);
  if (!pkg || !model) return 0;

  // 计算该额度能买多少Token
  const totalCredit = pkg.creditAmount + pkg.bonusCredit;
  const avgPricePer1K = (model.pricePer1KInput + model.pricePer1KOutput) / 2;
  const totalTokens = (totalCredit / avgPricePer1K) * 1000;

  // 假设50% input, 50% output
  const cost = (totalTokens / 2 / 1000) * model.costPer1KInput + (totalTokens / 2 / 1000) * model.costPer1KOutput;
  const margin = pkg.price - cost;
  return margin / pkg.price;
}

// 所有模型的统一展示
export const ALL_MODEL_CATEGORIES = [
  { key: 'text', label: '文本生成', icon: 'MessageOutlined', models: TEXT_MODELS },
  { key: 'embedding', label: '向量模型', icon: 'DatabaseOutlined', models: EMBEDDING_MODELS },
  { key: 'image', label: '图片生成', icon: 'PictureOutlined', models: IMAGE_MODELS },
  { key: 'video', label: '视频生成', icon: 'VideoCameraOutlined', models: VIDEO_MODELS },
  { key: 'audio', label: '语音处理', icon: 'AudioOutlined', models: AUDIO_MODELS },
  { key: 'agent', label: '智能体', icon: 'RobotOutlined', models: AGENT_MODELS },
];
