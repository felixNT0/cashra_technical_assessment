import { memo, useEffect } from "react";
import { cn } from "@/utils/classNames";

export type ToastType = "success" | "error" | "info";

type ToastProps = {
  id: string;
  message: string;
  type: ToastType;
  onClose: (id: string) => void;
  duration?: number;
};

const TOAST_STYLES: Record<ToastType, string> = {
  success:
    "bg-emerald-50 border-emerald-200 text-emerald-800 shadow-emerald-200/50",
  error: "bg-rose-50 border-rose-200 text-rose-800 shadow-rose-200/50",
  info: "bg-sky-50 border-sky-200 text-sky-800 shadow-sky-200/50",
};

const TOAST_ICONS: Record<ToastType, string> = {
  success: "✓",
  error: "×",
  info: "ℹ",
};

/**
 * Individual toast notification component
 */
export const Toast = memo(function Toast({
  id,
  message,
  type,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border-2 px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-300",
        TOAST_STYLES[type]
      )}
      role="alert"
      aria-live="polite"
      style={{
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/80 text-sm font-bold">
        {TOAST_ICONS[type]}
      </span>
      <p className="flex-1 text-sm font-semibold">{message}</p>
      <button
        type="button"
        onClick={() => onClose(id)}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/80 text-lg font-bold transition hover:scale-110 active:scale-95"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
});

