import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = (await request.json()) as {
    company?: string;
    name?: string;
    phone?: string;
    need?: string;
  };

  return NextResponse.json({
    ok: true,
    message: `已收到 ${body.company ?? '客户'} 的询盘（mock）。我们会尽快通过电话 ${body.phone ?? ''} 联系。`
  });
}
