export type Locale = 'zh' | 'en';

export type NavItem = {
  label: string;
  href: string;
};

export type ServiceItem = {
  title: string;
  desc: string;
};

export type ProductItem = {
  name: string;
  image: string;
  note: string;
};

export type CertificateItem = {
  title: string;
  image: string;
  desc: string;
};

export type ExhibitionItem = {
  title: string;
  image: string;
  desc: string;
};

export type StrengthStat = {
  label: string;
  value: string;
};

export type SiteContent = {
  seo: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    company: string;
    englishName: string;
  };
  contact: {
    person: string;
    phone: string;
    wechat: string;
    address: string;
    qrImage: string;
  };
  nav: NavItem[];
  hero: {
    title: string;
    subtitle: string;
    summary: string;
    ctaPrimary: string;
    ctaPhone: string;
    ctaWechat: string;
    bgImage: string;
  };
  services: ServiceItem[];
  products: ProductItem[];
  strengths: {
    intro: string;
    stats: StrengthStat[];
    bullets: string[];
    image: string;
  };
  certificates: CertificateItem[];
  exhibitions: ExhibitionItem[];
};

const zh: SiteContent = {
  seo: {
    title: '河北东驰静电分选厂 | 再生塑料分选加工',
    description:
      '河北东驰静电分选厂专注 ABS / PS 静电分选、再生塑料分选加工与原料采购，日产能力约100吨，服务华北地区再生塑料行业客户。'
  },
  brand: {
    name: '东驰塑品',
    company: '任丘市东驰塑料制品有限公司',
    englishName: 'Hebei Dongchi Electrostatic Sorting Plant'
  },
  contact: {
    person: '张凯',
    phone: '15132675231',
    wechat: '15132675231',
    address: '河北省沧州市任丘市长丰镇王庄村工业区',
    qrImage: '/images/wechat/dongchi-wechat-qr.svg'
  },
  nav: [
    { label: '首页', href: '/' },
    { label: '关于我们', href: '/about' },
    { label: '业务范围', href: '/services' },
    { label: '产品中心', href: '/products' },
    { label: '资质与展会', href: '/certificates' },
    { label: '联系我们', href: '/contact' }
  ],
  hero: {
    title: '河北东驰静电分选厂',
    subtitle: '专注 ABS / PS 静电分选与再生塑料分选加工',
    summary:
      '华北地区塑料静电分选服务商，支持 ABS、PS 等再生塑料分选加工与原料采购，日产能力约100吨。',
    ctaPrimary: '立即询盘',
    ctaPhone: '电话联系',
    ctaWechat: '微信咨询',
    bgImage: '/images/factory/hero-factory.svg'
  },
  services: [
    { title: 'ABS / PS 静电分选', desc: '针对混合再生塑料进行精细分离，提升原料可用率与稳定性。' },
    { title: '再生塑料分选加工', desc: '承接再生塑料分选、预处理与定制化加工服务。' },
    { title: '混粉料采购', desc: '稳定采购再生塑料混粉料，支持长期合作。' },
    { title: 'ABS车件破碎料采购', desc: '面向家电拆解与回收渠道采购 ABS 车件破碎料。' },
    { title: '黑/白/花色 ABS 破碎料', desc: '提供黑色、白色、花色 ABS 破碎料分选与供应。' },
    { title: '冰箱洗衣机料处理', desc: '处理冰箱、洗衣机来源 ABS 破碎料，流程成熟。' }
  ],
  products: [
    {
      name: 'ABS洗衣机上盖料',
      image: '/images/products/abs-washer-cover-real.jpg',
      note: '适用于家电再生料渠道，来源稳定。'
    },
    {
      name: '白色ABS破碎料',
      image: '/images/products/abs-white-real.jpg',
      note: '白度表现稳定，适配常规再生应用。'
    },
    {
      name: '黑花ABS破碎料',
      image: '/images/products/abs-black-mix-real.jpg',
      note: '黑花混合材质，支持分选与定向供货。'
    },
    {
      name: '黑色ABS破碎料',
      image: '/images/products/abs-black-real.jpg',
      note: '规格清晰，支持批量供需对接。'
    },
    {
      name: '花色ABS破碎料',
      image: '/images/products/abs-color-mix-real.jpg',
      note: '花色混合破碎料，按需匹配下游工艺。'
    }
  ],
  strengths: {
    intro: '聚焦“工厂能力 + 产品稳定 + 快速响应”，帮助客户降低原料不确定性。',
    stats: [
      { label: '日产能力', value: '约100吨' },
      { label: '静电分选线', value: '多套设备' },
      { label: '区域覆盖', value: '华北地区' }
    ],
    bullets: [
      '多年服务再生塑料行业客户，理解采购与分选痛点。',
      '围绕 ABS / PS 材料建立标准化分选加工流程。',
      '支持电话、微信、表单多通道快速询盘。'
    ],
    image: '/images/factory/factory-line.svg'
  },
  certificates: [
    {
      title: '注册商标证',
      image: '/images/certificates/trademark-real.jpg',
      desc: '东驰塑品注册商标证（真实素材）。'
    },
    {
      title: '企业主体信息',
      image: '/images/certificates/company-license.svg',
      desc: '任丘市东驰塑料制品有限公司主体展示。'
    }
  ],
  exhibitions: [
    {
      title: '展会海报',
      image: '/images/exhibition/expo-poster-real.jpg',
      desc: '再生塑料展会现场宣传海报（真实素材）。'
    },
    {
      title: '展位现场',
      image: '/images/exhibition/expo-booth-real.jpg',
      desc: '河北东驰静电分选厂展位实拍（真实素材）。'
    },
    {
      title: '合作洽谈',
      image: '/images/exhibition/expo-meeting.svg',
      desc: '体现商务沟通与合作拓展场景。'
    }
  ]
};

const en: SiteContent = {
  ...zh,
  seo: {
    title: 'Hebei Dongchi Electrostatic Sorting Plant | Recycled Plastic Solutions',
    description:
      'Industrial B2B portal for ABS/PS electrostatic sorting and recycled plastic processing services.'
  }
};

export const siteContentByLocale: Record<Locale, SiteContent> = { zh, en };

export const defaultLocale: Locale = 'zh';

export const getSiteContent = (locale: Locale = defaultLocale): SiteContent =>
  siteContentByLocale[locale];
