'use client';

import Image from 'next/image';

type ImagePreviewModalProps = {
  open: boolean;
  src: string;
  alt: string;
  onClose: () => void;
};

export default function ImagePreviewModal({ open, src, alt, onClose }: ImagePreviewModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#081a2d]/85 p-4" onClick={onClose}>
      <div className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-md bg-navy px-3 py-1 text-xs text-white"
        >
          关闭
        </button>
        <div className="relative h-[70vh] w-full bg-slate-100">
          <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" />
        </div>
      </div>
    </div>
  );
}
