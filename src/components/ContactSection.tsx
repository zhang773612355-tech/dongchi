'use client';

import Image from 'next/image';
import { FormEvent, useState } from 'react';
import type { SiteContent } from '@/data/site';
import ImagePreviewModal from '@/components/ImagePreviewModal';

type ContactSectionProps = {
  content: SiteContent;
  source?: string;
};

export default function ContactSection({ content, source }: ContactSectionProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');

    const formData = new FormData(event.currentTarget);
    const payload = {
      company: String(formData.get('company') || ''),
      name: String(formData.get('name') || ''),
      phone: String(formData.get('phone') || ''),
      need: String(formData.get('need') || '')
    };

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = (await res.json()) as { message: string };
      setMessage(data.message || '提交成功，我们将尽快联系您。');
      event.currentTarget.reset();
    } catch {
      setMessage('提交失败，请电话或微信直接联系。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="wechat" className="py-14 sm:py-16">
      <div className="container-shell grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="section-frame bg-gradient-to-b from-[#0f2740] to-[#143557] p-6 text-white sm:p-7">
          <h2 className="text-2xl font-semibold tracking-wide sm:text-3xl">联系方式与询盘</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-100 sm:text-base">
            支持电话、微信和在线表单。采购合作、分选代工、展会后对接，均可快速沟通。
          </p>

          <div className="mt-6 space-y-3 text-sm text-slate-100">
            <p>联系人：{content.contact.person}</p>
            <p>
              电话：
              <a className="font-semibold text-accentGreen" href={`tel:${content.contact.phone}`}>
                {content.contact.phone}
              </a>
            </p>
            <p>地址：{content.contact.address}</p>
            <p>微信：{content.contact.wechat}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`tel:${content.contact.phone}`}
              className="rounded-md bg-accentGreen px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              一键拨号
            </a>
            <button
              type="button"
              className="rounded-md bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
              onClick={() => setPreviewOpen(true)}
            >
              查看微信二维码
            </button>
          </div>

          <button
            type="button"
            className="mt-6 block rounded-lg border border-white/25 bg-white/10 p-2"
            onClick={() => setPreviewOpen(true)}
          >
            <div className="relative h-40 w-40 overflow-hidden rounded">
              <Image src={content.contact.qrImage} alt="微信二维码" fill className="object-cover" loading="lazy" sizes="160px" />
            </div>
            <span className="mt-2 block text-xs text-slate-100">点击放大二维码</span>
          </button>
        </div>

        <form onSubmit={onSubmit} className="section-frame bg-white p-6 sm:p-7">
          <h3 className="text-xl font-semibold tracking-wide text-navy">在线询盘表单</h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">当前为前端展示版，提交后由 mock handler 返回确认信息。</p>

          {source === 'expo' ? (
            <p className="mt-3 rounded-md border border-accentOrange/40 bg-orange-50 px-3 py-2 text-xs text-slate-700">
              已识别为展会客户入口，可在需求中备注展会名称/展位号，便于快速跟进。
            </p>
          ) : null}

          <div className="mt-6 grid gap-4">
            <label className="grid gap-1 text-sm text-slate-600">
              公司名称
              <input
                name="company"
                required
                placeholder="请输入公司名称"
                className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-accentGreen"
              />
            </label>
            <label className="grid gap-1 text-sm text-slate-600">
              联系人
              <input
                name="name"
                required
                placeholder="请输入联系人"
                className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-accentGreen"
              />
            </label>
            <label className="grid gap-1 text-sm text-slate-600">
              联系电话
              <input
                name="phone"
                required
                placeholder="请输入联系电话"
                className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-accentGreen"
              />
            </label>
            <label className="grid gap-1 text-sm text-slate-600">
              需求描述
              <textarea
                name="need"
                rows={5}
                placeholder="请填写您的产品/采购/分选需求"
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-accentGreen"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-5 rounded-md bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-steel disabled:opacity-70"
          >
            {submitting ? '提交中...' : '提交询盘'}
          </button>

          {message ? (
            <div className="mt-4 rounded-md border border-accentGreen/30 bg-emerald-50 px-3 py-3 text-sm text-slate-700">
              <p className="font-semibold text-navy">{message}</p>
              <p className="mt-1 text-xs">建议下一步：电话确认需求细节，或微信发送样料图片。</p>
            </div>
          ) : null}
        </form>
      </div>

      <ImagePreviewModal
        open={previewOpen}
        src={content.contact.qrImage}
        alt="微信二维码"
        onClose={() => setPreviewOpen(false)}
      />
    </section>
  );
}
