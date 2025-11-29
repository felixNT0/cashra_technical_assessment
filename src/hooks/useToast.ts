import { useCallback, useState } from "react";
import type { ToastType } from "@/components/ui/Toast";

type ToastItem = {
  id: string;
  message: string;
  type: ToastType;
};

/**
 * Custom hook for managing toast notifications
 */
export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showSuccess = useCallback(
    (message: string) => showToast(message, "success"),
    [showToast]
  );

  const showError = useCallback(
    (message: string) => showToast(message, "error"),
    [showToast]
  );

  const showInfo = useCallback(
    (message: string) => showToast(message, "info"),
    [showToast]
  );

  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    showInfo,
    removeToast,
  };
}

