import { memo } from "react";

type FilterButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

/**
 * Specialized button for filter bar with active state indicator
 */
export const FilterButton = memo(function FilterButton({
  label,
  isActive,
  onClick,
}: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "cursor-pointer relative inline-flex items-center justify-center gap-1.5 rounded-xl border-2 px-3 py-1.5 text-[11px] font-bold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95 touch-manipulation sm:px-4 sm:py-2 sm:text-xs md:px-5 md:py-2.5",
        isActive
          ? "border-brand bg-linear-to-r from-brand via-sky-500 to-brand bg-size-[200%_auto] text-white shadow-lg shadow-brand/50 focus-visible:outline-brand hover:bg-position-[100%]"
          : "border-slate-300/60 bg-white/90 text-slate-600 shadow-sm hover:border-brand/60 hover:bg-brand/5 hover:text-brand hover:shadow-md focus-visible:outline-slate-300 active:bg-brand/10",
      ].join(" ")}
      aria-pressed={isActive}
    >
      {isActive && (
        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-pulse sm:h-2.5 sm:w-2.5" />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
});

