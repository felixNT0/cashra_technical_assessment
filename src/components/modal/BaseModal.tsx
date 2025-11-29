"use client";

import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
};

export function BaseModal({
  open,
  title,
  onClose,
  children,
  footer,
}: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4 py-8 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-3xl bg-linear-to-br from-white to-slate-50/90 shadow-2xl ring-1 ring-white/50 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200/60 bg-linear-to-r from-brand/5 to-transparent px-6 py-4">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="space-y-4 px-6 py-5">{children}</div>
        {footer && (
          <div className="border-t border-slate-200/60 bg-slate-50/50 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
