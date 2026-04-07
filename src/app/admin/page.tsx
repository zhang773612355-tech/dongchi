import Image from 'next/image';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdminAuthed } from '@/lib/admin-auth';
import { getManagedSiteContent } from '@/lib/cms-content';

export const metadata: Metadata = {
  title: '图片后台管理 | 东驰塑品',
  robots: { index: false, follow: false }
};

function UploadCard({
  title,
  image,
  slotKey,
  desc
}: {
  title: string;
  image: string;
  slotKey: string;
  desc?: string;
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-panel">
      <h3 className="text-sm font-semibold text-navy">{title}</h3>
      {desc ? <p className="mt-1 text-xs text-slate-500">{desc}</p> : null}
      <div className="relative mt-3 h-40 overflow-hidden rounded border border-slate-200 bg-slate-100">
        <Image src={image} alt={title} fill className="object-cover" sizes="300px" />
      </div>
      <form action="/api/admin/upload" method="post" encType="multipart/form-data" className="mt-3 space-y-2">
        <input type="hidden" name="slotKey" value={slotKey} />
        <input
          type="file"
          name="image"
          required
          accept="image/png,image/jpeg,image/webp"
          className="block w-full text-xs text-slate-600 file:mr-3 file:rounded file:border-0 file:bg-slate-100 file:px-3 file:py-2"
        />
        <button type="submit" className="rounded-md bg-navy px-3 py-2 text-xs font-semibold text-white">
          上传并替换
        </button>
      </form>
    </article>
  );
}

export default async function AdminPage({
  searchParams
}: {
  searchParams?: { updated?: string; error?: string };
}) {
  if (!isAdminAuthed()) {
    redirect('/admin/login');
  }

  const content = await getManagedSiteContent('zh');

  return (
    <section className="py-10">
      <div className="container-shell">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-navy">图片后台管理</h1>
            <p className="mt-1 text-sm text-slate-600">上传后前台自动生效，文件会保存到 `public/uploads/...`。</p>
          </div>
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700">
              退出登录
            </button>
          </form>
        </div>

        {searchParams?.updated ? (
          <p className="mb-4 rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            已更新：{searchParams.updated}
          </p>
        ) : null}
        {searchParams?.error ? (
          <p className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">上传失败，请重试。</p>
        ) : null}

        <div className="space-y-10">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-navy">产品图片</h2>
            <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-navy">新增产品（支持多图）</h3>
              <form
                action="/api/admin/products/create"
                method="post"
                encType="multipart/form-data"
                className="mt-3 grid gap-3 sm:grid-cols-2"
              >
                <input
                  name="name"
                  required
                  placeholder="产品名称（例如：白色ABS破碎料）"
                  className="h-10 rounded-md border border-slate-300 px-3 text-sm"
                />
                <input
                  name="note"
                  placeholder="产品说明（可选）"
                  className="h-10 rounded-md border border-slate-300 px-3 text-sm"
                />
                <input
                  type="file"
                  name="images"
                  multiple
                  required
                  accept="image/png,image/jpeg,image/webp"
                  className="sm:col-span-2 block w-full text-xs text-slate-600 file:mr-3 file:rounded file:border-0 file:bg-white file:px-3 file:py-2"
                />
                <button
                  type="submit"
                  className="sm:col-span-2 w-fit rounded-md bg-navy px-4 py-2 text-xs font-semibold text-white"
                >
                  新增产品并上传图片
                </button>
              </form>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.products.map((item, idx) => (
                <article key={item.name} className="rounded-xl border border-slate-200 bg-white p-4 shadow-panel">
                  <h3 className="text-sm font-semibold text-navy">{item.name}</h3>
                  <p className="mt-1 text-xs text-slate-500">{item.note}</p>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {item.images?.map((img, i) => (
                      <div key={`${item.name}-${i}`} className="relative h-20 overflow-hidden rounded border border-slate-200 bg-slate-100">
                        <Image src={img} alt={`${item.name}-${i + 1}`} fill className="object-cover" sizes="120px" />
                      </div>
                    ))}
                  </div>

                  <form
                    action="/api/admin/products/add-images"
                    method="post"
                    encType="multipart/form-data"
                    className="mt-3 space-y-2"
                  >
                    <input type="hidden" name="productIndex" value={String(idx)} />
                    <input
                      type="file"
                      name="images"
                      multiple
                      required
                      accept="image/png,image/jpeg,image/webp"
                      className="block w-full text-xs text-slate-600 file:mr-3 file:rounded file:border-0 file:bg-slate-100 file:px-3 file:py-2"
                    />
                    <button type="submit" className="rounded-md bg-navy px-3 py-2 text-xs font-semibold text-white">
                      追加图片
                    </button>
                  </form>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-navy">工厂展示图片</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <UploadCard title="首页 Hero 工厂图" image={content.hero.bgImage} slotKey="factory:hero" />
              <UploadCard title="工厂实力模块图片" image={content.strengths.image} slotKey="factory:strength" />
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-navy">资质图片</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.certificates.map((item, idx) => (
                <UploadCard key={item.title} title={item.title} image={item.image} slotKey={`certificate:${idx}`} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-navy">展会图片</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.exhibitions.map((item, idx) => (
                <UploadCard key={item.title} title={item.title} image={item.image} slotKey={`exhibition:${idx}`} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-navy">微信二维码</h2>
            <div className="max-w-sm">
              <UploadCard title="微信二维码" image={content.contact.qrImage} slotKey="contact:qr" />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
