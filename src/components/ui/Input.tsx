import { memo, type InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

/**
 * Reusable Input component
 */
export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(function Input(
    { label, error, className = "", ...props },
    ref
  ) {
    const baseStyles =
      "w-full rounded-xl border-2 border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-800 shadow-sm transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 sm:px-4 sm:py-2.5 sm:text-base md:py-3";

    return (
      <label className="flex flex-col gap-2">
        {label && (
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            {label}
          </span>
        )}
        <input ref={ref} className={`${baseStyles} ${className}`} {...props} />
        {error && <span className="text-xs text-red-600">{error}</span>}
      </label>
    );
  })
);

