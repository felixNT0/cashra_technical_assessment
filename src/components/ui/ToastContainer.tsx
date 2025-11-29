"use client";

import { memo } from "react";
import { Toast, type ToastType } from "./Toast";

type ToastItem = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastContainerProps = {
  toasts: ToastItem[];
  onClose: (id: string) => void;
};

/**
 * Container for toast notifications
 */
export const ToastContainer = memo(function ToastContainer({
  toasts,
  onClose,
}: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed right-4 top-4 z-[100] flex max-w-md flex-col gap-2 sm:right-6 sm:top-6 md:right-8 md:top-8"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={onClose}
        />
      ))}
    </div>
  );
});

