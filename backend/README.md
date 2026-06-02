# Token Hub 后端项目

## 技术栈
- Python 3.11+
- FastAPI + Uvicorn
- SQLAlchemy 2.0 + Alembic
- PostgreSQL 15
- Redis 7
- Celery + Redis
- python-alipay-sdk

## 目录结构
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI应用入口
│   ├── config.py            # 配置管理
│   ├── database.py          # 数据库连接
│   ├── models/              # SQLAlchemy模型
│   ├── schemas/             # Pydantic模型
│   ├── api/                 # API路由
│   │   ├── v1/
│   │   │   ├── auth.py      # 认证接口
│   │   │   ├── users.py     # 用户接口
│   │   │   ├── packages.py  # 套餐接口
│   │   │   ├── orders.py    # 订单接口
│   │   │   ├── api_keys.py  # API Key接口
│   │   │   ├── ai_proxy.py  # AI调用代理
│   │   │   ├── channels.py  # 渠道接口
│   │   │   └── admin/       # 管理后台接口
│   │   └── deps.py          # 依赖注入
│   ├── services/            # 业务逻辑层
│   │   ├── auth_service.py
│   │   ├── user_service.py
│   │   ├── order_service.py
│   │   ├── billing_service.py
│   │   ├── model_router_service.py
│   │   ├── alipay_service.py
│   │   ├── channel_service.py
│   │   └── notification_service.py
│   ├── utils/               # 工具函数
│   │   ├── crypto.py        # 加密解密
│   │   ├── id_generator.py  # ID生成
│   │   ├── validators.py    # 验证器
│   │   └── response.py      # 统一响应
│   └── middleware/          # 中间件
│       ├── auth.py          # 认证中间件
│       ├── rate_limit.py    # 限流中间件
│       └── logging.py       # 日志中间件
├── alembic/                 # 数据库迁移
├── config/
│   └── settings.yaml        # 配置文件
├── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

## 快速开始

```bash
# 1. 安装依赖
pip install -r requirements.txt

# 2. 配置数据库 (PostgreSQL + Redis)
# 修改 config/settings.yaml

# 3. 数据库迁移
alembic upgrade head

# 4. 启动服务
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## API文档
启动后访问: http://localhost:8000/docs
