import { memo } from "react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

/**
 * Search input component with icon
 */
export const SearchBar = memo(function SearchBar({
  value,
  onChange,
  placeholder = "Search by name or role...",
}: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search team members"
        className="w-full rounded-xl border-2 border-slate-200 bg-white/90 pl-10 pr-10 py-2.5 text-sm text-slate-800 shadow-sm transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 sm:pl-11 sm:pr-11 sm:py-3 sm:text-base"
      />
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-slate-400 pointer-events-none z-10 sm:left-4 sm:text-lg">
        🔍
      </span>
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 z-10 sm:right-4 sm:text-xl"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
});

