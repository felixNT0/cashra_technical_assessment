import { memo } from "react";

type ViewMode = "grid" | "list";

type ViewToggleProps = {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
};

/**
 * View mode toggle component (Grid/List)
 */
export const ViewToggle = memo(function ViewToggle({
  view,
  onChange,
}: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border-2 border-slate-200 bg-white/90 p-0.5 shadow-sm sm:p-1">
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={`cursor-pointer rounded-md px-2.5 py-1.5 text-xs font-semibold transition-all sm:px-3 sm:py-2 sm:text-sm md:px-4 ${
          view === "grid"
            ? "bg-brand text-white shadow-md"
            : "text-slate-600 hover:bg-slate-100"
        }`}
        aria-pressed={view === "grid"}
        aria-label="Grid view"
        title="Grid view"
      >
        <span className="text-base sm:text-lg">⊞</span>
      </button>
      <button
        type="button"
        onClick={() => onChange("list")}
        className={`cursor-pointer rounded-md px-2.5 py-1.5 text-xs font-semibold transition-all sm:px-3 sm:py-2 sm:text-sm md:px-4 ${
          view === "list"
            ? "bg-brand text-white shadow-md"
            : "text-slate-600 hover:bg-slate-100"
        }`}
        aria-pressed={view === "list"}
        aria-label="List view"
        title="List view"
      >
        <span className="text-base sm:text-lg">☰</span>
      </button>
    </div>
  );
});
