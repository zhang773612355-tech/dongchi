# 河北东驰静电分选厂工业 B2B 门户网站

基于 Next.js + TypeScript + Tailwind CSS 构建，面向再生塑料行业客户，用于展示工厂能力、产品类型、资质背书，并引导电话/微信/表单询盘。

## 1. 目录结构

```text
.
├── public/
│   └── images/
│       ├── factory/
│       ├── products/
│       ├── certificates/
│       ├── exhibition/
│       └── wechat/
├── src/
│   ├── app/
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── products/page.tsx
│   │   ├── certificates/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── api/inquiry/route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ProductsGrid.tsx
│   │   ├── StrengthSection.tsx
│   │   ├── CertificatesSection.tsx
│   │   ├── ExhibitionGallery.tsx
│   │   ├── ContactSection.tsx
│   │   ├── ImagePreviewModal.tsx
│   │   ├── Footer.tsx
│   │   └── PageHero.tsx
│   └── data/
│       └── site.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 2. 本地启动

1. 安装依赖

```bash
npm install
```

2. 启动开发环境

```bash
npm run dev
```

3. 打开浏览器访问

```text
http://localhost:3000
```

## 3. 页面说明

- `/` 首页
- `/about` 关于我们
- `/services` 业务范围
- `/products` 产品中心
- `/certificates` 资质与展会
- `/contact` 联系我们

## 4. 如何替换文案与联系方式

统一编辑：

- `src/data/site.ts`

可直接替换：

- 品牌名、公司主体、联系人、电话、地址
- Hero 文案、业务列表、产品列表、资质与展会说明

## 5. 如何替换图片

1. 把真实素材放到 `public/images/` 对应目录。
2. 在 `src/data/site.ts` 中修改图片路径字段。
3. 产品、资质、展会、微信二维码都支持点击弹窗预览，非首屏图默认懒加载。

## 6. 表单提交说明

- 当前使用 mock 接口：`src/app/api/inquiry/route.ts`
- 前端表单在 `src/components/ContactSection.tsx`
- 后续接入真实 CRM / 邮件 / 企业微信 webhook 时，直接替换 mock handler 即可。

## 7. SEO 与结构化数据

- 全站 metadata / Open Graph 在 `src/app/layout.tsx`
- 页面级 metadata 在各页面 `page.tsx`
- `layout.tsx` 内置 `Organization` JSON-LD 结构化数据

## 8. 英文版本扩展能力

`src/data/site.ts` 已预留：

- `Locale` 类型（`zh` / `en`）
- `siteContentByLocale` 数据结构

后续可接入：

- 路由分组（如 `/en`）
- 中英文切换器组件
- 按 locale 动态注入 metadata

## 9. 后台图片管理（快速版）

### 访问入口

- 登录页：`/admin/login`
- 管理页：`/admin`

### 登录方式

当前为单管理员账号密码（环境变量）。

在项目根目录创建 `.env.local`（可参考 `.env.example`）：

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=你的强密码
ADMIN_SESSION_SECRET=你的随机长字符串
```

### 功能范围

后台可上传并替换以下图片：

- 产品图片
- 工厂展示图片（首页 Hero / 工厂实力）
- 资质图片
- 展会图片
- 微信二维码

### 存储位置

- 上传文件保存到：`public/uploads/...`
- 覆盖配置保存到：`data/admin-content.json`

说明：前台页面会自动读取该配置并实时使用新图片，无需改代码。
