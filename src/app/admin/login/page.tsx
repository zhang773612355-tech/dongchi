import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '后台登录 | 东驰塑品',
  robots: { index: false, follow: false }
};

export default function AdminLoginPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  const hasError = searchParams?.error === '1';

  return (
    <section className="min-h-[70vh] py-16">
      <div className="container-shell max-w-md">
        <div className="section-frame bg-white p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-navy">后台登录</h1>
          <p className="mt-2 text-sm text-slate-600">登录后可上传并替换网站图片素材。</p>

          {hasError ? (
            <p className="mt-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">账号或密码错误</p>
          ) : null}

          <form action="/api/admin/login" method="post" className="mt-6 space-y-4">
            <label className="grid gap-1 text-sm text-slate-600">
              账号
              <input name="username" required className="h-11 rounded-md border border-slate-300 px-3 text-sm" />
            </label>
            <label className="grid gap-1 text-sm text-slate-600">
              密码
              <input name="password" type="password" required className="h-11 rounded-md border border-slate-300 px-3 text-sm" />
            </label>
            <button type="submit" className="w-full rounded-md bg-navy py-3 text-sm font-semibold text-white">
              登录后台
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
