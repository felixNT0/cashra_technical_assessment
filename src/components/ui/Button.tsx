import { memo, type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "icon" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-linear-to-r from-brand to-sky-600 text-white shadow-md shadow-brand/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/40",
  secondary:
    "border border-slate-200 bg-white/80 text-slate-600 hover:border-brand hover:bg-brand/10 hover:text-brand",
  icon: "border border-slate-200 bg-white/80 text-slate-500 hover:border-brand hover:bg-brand/10 hover:text-brand",
  danger: "border border-slate-200 bg-white/80 text-slate-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "h-5 w-5 rounded-md text-[10px] sm:h-6 sm:w-6 sm:rounded-lg sm:text-xs",
  md: "px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm",
  lg: "px-4 py-2.5 text-sm font-semibold sm:px-6 sm:py-3 sm:text-base",
};

/**
 * Reusable Button component
 */
export const Button = memo(function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "cursor-pointer inline-flex items-center justify-center gap-1.5 font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-95 touch-manipulation rounded-lg";

  const variantStyle = VARIANT_STYLES[variant];
  const sizeStyle = variant === "icon" ? SIZE_STYLES.sm : SIZE_STYLES[size];
  const fullSizeStyle =
    variant === "icon" || className.includes("!w-auto") || className.includes("w-auto")
      ? ""
      : variant === "primary" && !className.includes("!w-")
      ? "w-full"
      : "";

  return (
    <button
      className={`${baseStyles} ${variantStyle} ${sizeStyle} ${fullSizeStyle} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
});

